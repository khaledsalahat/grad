import { HttpParams, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  Observable,
  catchError,
  forkJoin,
  map,
  of,
  switchMap,
  tap,
  throwError
} from "rxjs";
import { v4 as uuidv4 } from "uuid";
import { ApiService } from "./api.service";
import { HttpClient } from "@angular/common/http";
import { NotificationService } from "./notification.service";
import { Request } from "./requests.model";
import { Venue } from "./venue.model";
import { User } from "@/types/user";
import { AuthService } from "@/layout/service/auth.service";
import { LocalStorageService } from './local-storage.service';
import { environment } from "src/environments/environment";

@Injectable({ providedIn: "root" })
export class VenueService {
  private apiUrl = 'Venues';
  private unavailableDatesStore: { [venueId: string]: string[] } = {};
  private acceptedDates: string[] = [];

  public requests: Request[] = [];

  constructor(
    private api: ApiService,
    private http: HttpClient,
    private notificationService: NotificationService,
    private authService: AuthService
  ) { }


  private normalizePhotoUrl(url: string): string {
    if (!url) return '';
    let backend = environment.backendUrl;
    if (url.startsWith(backend)) {
      url = url.substring(backend.length);
    }
    url = url.replace(/^\/+/, '');
    return url;
  }

  getFilteredWeddingHalls(filters: {
    location?: string;
    date?: Date;
  }): Observable<Venue[]> {
    let params = new HttpParams()
      .set("type", "wedding-hall")
      .set("location", filters.location || "")
      .set("date", filters.date ? filters.date.toISOString() : "");

    return this.api
      .get<Venue[]>(this.apiUrl, params)
      .pipe(
        catchError(error => {
          console.error("Error fetching wedding halls:", error);
          return of([]);
        }),
        map((venues) => {
          if (!Array.isArray(venues)) {
            venues = venues ? [venues] : [];
          }

          const filteredVenues = venues.filter(
            (venue: Venue) =>
              venue.type === "wedding-hall" &&
              this.filterByLocation(venue, filters.location) &&
              this.filterByDate(venue, filters.date)
          );

          filteredVenues.forEach(venue => {
            if (venue.mainPicture) {
              venue.mainPicture = this.fixPhotoUrls([venue.mainPicture])[0];
            }

            if (venue.photos && venue.photos.length > 0) {
              if (venue.mainPicture) {
                const mainNorm = this.normalizePhotoUrl(venue.mainPicture);
                venue.photos = venue.photos.filter(photo => {
                  const photoUrl = typeof photo === 'object' && photo !== null
                    ? ((photo as any).photoUrl || (photo as any).PhotoUrl || '')
                    : photo as string;
                  return this.normalizePhotoUrl(photoUrl) !== mainNorm;
                });
              }
              venue.photos = this.fixPhotoUrls(venue.photos);
            }
          });

          console.log(`getFilteredWeddingHalls: Found ${filteredVenues.length} wedding halls that match filters`);
          return filteredVenues;
        })
      );
  }

  updateVenue(venueId: string, venueData: Partial<Venue>): Observable<Venue> {
    return this.getVenueById(venueId).pipe(
      switchMap((currentVenue) => {
        console.log("Current venue data before update:", {
          id: currentVenue.id,
          title: currentVenue.title,
          globalTimeSlots: currentVenue.globalTimeSlots?.length || 0,
          availability: currentVenue.availability?.length || 0
        });
        console.log("Update data received:", Object.keys(venueData));

        const updateData: Partial<Venue> = {};

        if (venueData.photos) {
          updateData.photos = venueData.photos;
          if (venueData.mainPicture) {
            updateData.mainPicture = venueData.mainPicture;
          }
        }

        if (venueData.amenities) {
          updateData.amenities = venueData.amenities;
        }

        if (venueData.pricing) {
          updateData.pricing = venueData.pricing.map(price => ({
            duration: price.duration,
            price: price.price,
            checkInTime: price.checkInTime
              ? this.formatTimeToHHMMSS(price.checkInTime)
              : undefined,
            checkoutTime: price.checkoutTime
              ? this.formatTimeToHHMMSS(price.checkoutTime)
              : undefined,
          }));
        }

        if (venueData.availability) {
          updateData.availability = venueData.availability.map(avail => ({
            date: avail.date ? this.formatDateToYYYYMMDD(avail.date) : avail.date,
            times: avail.times?.map(time => ({
              startTime: this.formatTimeToHHMMSS(time.startTime),
              endTime: this.formatTimeToHHMMSS(time.endTime)
            })) || [],
            unavailableTimes: avail.unavailableTimes || [],
            fullyBooked: avail.fullyBooked || false,
            amBooked: avail.amBooked || false,
            pmBooked: avail.pmBooked || false
          }));
        }

        if (venueData.globalTimeSlots) {
          updateData.globalTimeSlots = venueData.globalTimeSlots.map(slot => ({
            startTime: this.formatTimeToHHMMSS(slot.startTime),
            endTime: this.formatTimeToHHMMSS(slot.endTime),
            slotName: slot.slotName
          }));
        }

        if (venueData.title) updateData.title = venueData.title;
        if (venueData.description) updateData.description = venueData.description;
        if (venueData.location) updateData.location = venueData.location;
        if (venueData.pricePerDay !== undefined) updateData.pricePerDay = venueData.pricePerDay;
        if (venueData.capacity !== undefined) updateData.capacity = venueData.capacity;
        if (venueData.rooms !== undefined) updateData.rooms = venueData.rooms;
        if (venueData.bathrooms !== undefined) updateData.bathrooms = venueData.bathrooms;

        if (venueData.unavailableDates) {
          updateData.unavailableDates = venueData.unavailableDates.map(date =>
            this.formatDateToYYYYMMDD(date)
          );
        }

        console.log("Update data being sent to API:", Object.keys(updateData));
        console.log("Global time slots being preserved:", currentVenue.globalTimeSlots?.length || 0);

        return this.api.put<Venue>(`${this.apiUrl}/${venueId}`, updateData);
      }),
      catchError((error) => {
        console.error("Error updating venue:", error);
        throw error;
      })
    );
  }


  getVenueById(venueId: string): Observable<Venue> {
    return this.api.get<Venue>(`${this.apiUrl}/${venueId}`).pipe(
      map((venue) => ({
        ...venue,
        checkInTime: venue.checkInTime
          ? new Date(venue.checkInTime)
          : undefined,
        checkoutTime: venue.checkoutTime
          ? new Date(venue.checkoutTime)
          : undefined,
        amenities: venue.amenities || [],
      }))
    );
  }

  getFilteredchalets(filters: {
    location?: string;
    date?: Date;
  }): Observable<Venue[]> {
    let params = new HttpParams()
      .set("type", "chalet")
      .set("location", filters.location || "")
      .set("date", filters.date ? filters.date.toISOString() : "");

    return this.api
      .get<Venue[]>(this.apiUrl, params)
      .pipe(
        catchError(error => {
          console.error("Error fetching chalets:", error);
          return of([]);
        }),
        map((venues) => {
          if (!Array.isArray(venues)) {
            venues = venues ? [venues] : [];
          }

          const filteredVenues = venues.filter(
            (venue: Venue) =>
              venue.type === "chalet" &&
              this.filterByLocation(venue, filters.location) &&
              this.filterByDate(venue, filters.date)
          );

          filteredVenues.forEach(venue => {
            if (venue.mainPicture) {
              venue.mainPicture = this.fixPhotoUrls([venue.mainPicture])[0];
            }

            if (venue.photos && venue.photos.length > 0) {
              if (venue.mainPicture) {
                const mainNorm = this.normalizePhotoUrl(venue.mainPicture);
                venue.photos = venue.photos.filter(photo => {
                  const photoUrl = typeof photo === 'object' && photo !== null
                    ? ((photo as any).photoUrl || (photo as any).PhotoUrl || '')
                    : photo as string;
                  return this.normalizePhotoUrl(photoUrl) !== mainNorm;
                });
              }
              venue.photos = this.fixPhotoUrls(venue.photos);
            }
          });

          console.log(`getFilteredchalets: Found ${filteredVenues.length} chalets that match filters`);
          return filteredVenues;
        })
      );
  }

  private filterByLocation(venue: Venue, location?: string): boolean {
    return (
      !location || venue.location.toLowerCase().includes(location.toLowerCase())
    );
  }

  private filterByDate(venue: Venue, date?: Date): boolean {
    if (!date) return true;

    const dateString = date.toISOString().split("T")[0];
    return !venue.unavailableDates?.some((d) => d.split("T")[0] === dateString);
  }

  getVenuesByType(type: "wedding-hall" | "chalet"): Observable<Venue[]> {
    console.log(`Getting venues by type: ${type}`);
    let params = new HttpParams().set("type", type);

    return this.api.get<Venue[]>(this.apiUrl, params).pipe(
      catchError(error => {
        console.error(`Error fetching venues of type ${type}:`, error);
        return of([]);
      }),
      map(venues => {
        if (!Array.isArray(venues)) {
          venues = venues ? [venues] : [];
        }

        const filteredVenues = venues.filter(venue => {
          return venue.type === type;
        });

        console.log(`Found ${filteredVenues.length} ${type} venues (including ${filteredVenues.filter(v => v.status === 'approved').length} approved)`);
        return filteredVenues;
      })
    );
  }

  getAllVenues(): Observable<Venue[]> {
    return this.api.get<Venue[]>(this.apiUrl);
  }

  getVenueDetails(id: string): Observable<any> {
    return this.api.get<Venue>(`${this.apiUrl}/${id}`).pipe(
      switchMap(venue => {
        if (venue.type === 'wedding-hall') {
          if (!venue.weddingHallCheckInTime || !venue.weddingHallCheckoutTime) {
            const today = new Date();
            venue.weddingHallCheckInTime = new Date(today.setHours(8, 0, 0, 0)).toISOString();
            venue.weddingHallCheckoutTime = new Date(today.setHours(20, 0, 0, 0)).toISOString();
          }

          if (venue.globalTimeSlots && venue.globalTimeSlots.length > 0) {
            venue.globalTimeSlots = venue.globalTimeSlots.map(slot => {
              const processTimes = (timeStr: string | undefined) => {
                if (!timeStr) return new Date().toISOString();

                try {
                  if (!timeStr.includes('T')) {
                    const [hours, minutes, seconds] = timeStr.split(':').map(Number);
                    const date = new Date();
                    date.setHours(hours || 0, minutes || 0, seconds || 0, 0);
                    return date.toISOString();
                  }
                  return timeStr;
                } catch (e) {
                  console.error('Error processing time:', timeStr, e);
                  return new Date().toISOString();
                }
              };

              return {
                ...slot,
                startTime: processTimes(slot.startTime),
                endTime: processTimes(slot.endTime)
              };
            });
          }
        }

        if (venue.availability && venue.availability.length > 0) {
          console.log('Venue availability data:', JSON.stringify(venue.availability));
        }

        if (venue.mainPicture) {
          const fixedMainPicture = this.fixPhotoUrls([venue.mainPicture])[0];
          venue.mainPicture = fixedMainPicture;
        }

        if (venue.photos && venue.photos.length > 0 && venue.mainPicture) {
          const mainNorm = this.normalizePhotoUrl(venue.mainPicture);
          venue.photos = venue.photos.filter(photo => {
            const photoUrl = typeof photo === 'object' && photo !== null
              ? ((photo as any).photoUrl || (photo as any).PhotoUrl || '')
              : photo as string;
            return this.normalizePhotoUrl(photoUrl) !== mainNorm;
          });

          venue.photos = this.fixPhotoUrls(venue.photos);
        }

        if (venue.pricing && venue.pricing.length > 0) {
          venue.pricing = venue.pricing.map(option => {
            const processTimes = (timeStr: string | undefined) => {
              if (!timeStr) return new Date().toISOString();

              try {
                if (!timeStr.includes('T')) {
                  const [hours, minutes, seconds] = timeStr.split(':').map(Number);
                  const date = new Date();
                  date.setHours(hours || 0, minutes || 0, seconds || 0, 0);
                  return date.toISOString();
                }
                return timeStr;
              } catch (e) {
                console.error('Error processing pricing time:', timeStr, e);
                return new Date().toISOString();
              }
            };

            return {
              ...option,
              checkInTime: processTimes(option.checkInTime as string),
              checkoutTime: processTimes(option.checkoutTime as string)
            };
          });
        }

        return of(venue);
      })
    );
  }

  private formatTimeToHHMMSS(dateTime: string | Date): string {
    const date = new Date(dateTime);
    return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:00`;
  }

  private formatDateToYYYYMMDD(dateTime: string | Date): string {
    const date = typeof dateTime === 'string' ? new Date(dateTime) : dateTime;
    return date.toISOString().split('T')[0];
  }

  createVenue(venueData: Omit<Venue, "id" | "createdAt">, ownerId: string): Observable<Venue> {
    const newVenue: Venue = {
      ...venueData,
      id: uuidv4(),
      ownerId: ownerId,
      status: 'pending',
      createdAt: new Date().toISOString(),
      amenities: venueData.amenities || [],
      pricing: venueData.pricing?.map(p => ({
        ...p,
        checkInTime: this.formatTimeToHHMMSS(p.checkInTime ?? ""),
        checkoutTime: this.formatTimeToHHMMSS(p.checkoutTime ?? "")
      })) || [],
      photos: venueData.photos,

      mainPicture: venueData.mainPicture || venueData.photos?.[0] || '',
      availability: venueData.availability?.map(avail => ({
        ...avail,
        date: this.formatDateToYYYYMMDD(avail.date),
        times: avail.times?.map(time => ({
          startTime: this.formatTimeToHHMMSS(time.startTime),
          endTime: this.formatTimeToHHMMSS(time.endTime)
        })) || []
      })) || [],
      globalTimeSlots: venueData.globalTimeSlots?.map(slot => ({
        startTime: this.formatTimeToHHMMSS(slot.startTime),
        endTime: this.formatTimeToHHMMSS(slot.endTime),
        slotName: slot.slotName
      })) || [],
      unavailableDates: venueData.unavailableDates?.map(date =>
        this.formatDateToYYYYMMDD(date)
      ) || [],
    };

    return this.api.post<Venue>(this.apiUrl, newVenue).pipe(
      tap(venue => this.notifyAdmins(venue))
    );
  }

  private notifyAdmins(venue: Venue): void {
    this.api.get<User[]>('users?role=admin').subscribe(admins => {
      admins.forEach(admin => {
        this.notificationService.createNotification({
          userId: admin.id,
          type: 'venue-submission',
          message: `New venue submission: ${venue.title}`,
          read: false,
          metadata: {
            venueId: venue.id,
            ownerId: venue.ownerId
          }
        }).subscribe();
      });
    });
  }

  createVenueWithPendingStatus(venueData: Omit<Venue, "id" | "createdAt" | "status">, ownerId: string): Observable<Venue> {
    const newVenue: any = {
      title: venueData.title,
      description: venueData.description,
      type: venueData.type,
      location: venueData.location,
      ownerId: ownerId,
      status: "pending",
      mainPicture: venueData.mainPicture || '',
      submissionDate: new Date().toISOString(),
      createdAt: new Date().toISOString(),

      photos: venueData.photos || [],
      amenities: venueData.amenities || [],

      availability: venueData.availability?.map(avail => ({
        date: avail.date ? this.formatDateToYYYYMMDD(avail.date) : avail.date,
        times: avail.times?.map(time => ({
          startTime: this.formatTimeToHHMMSS(time.startTime),
          endTime: this.formatTimeToHHMMSS(time.endTime)
        })) || []
      })) || [],

      globalTimeSlots: venueData.globalTimeSlots?.map(slot => ({
        startTime: this.formatTimeToHHMMSS(slot.startTime),
        endTime: this.formatTimeToHHMMSS(slot.endTime),
        slotName: slot.slotName
      })) || [],

      unavailableDates: venueData.unavailableDates?.map(date =>
        this.formatDateToYYYYMMDD(date)
      ) || [],
    };

    if (venueData.pricing && Array.isArray(venueData.pricing)) {
      newVenue.pricing = venueData.pricing.map(p => ({
        duration: p.duration,
        price: Number(p.price),
        checkInTime: p.checkInTime ? this.formatTimeToHHMMSS(p.checkInTime) : undefined,
        checkoutTime: p.checkoutTime ? this.formatTimeToHHMMSS(p.checkoutTime) : undefined
      }));
    }

    if (venueData.type === 'wedding-hall') {
      newVenue.capacity = Number(venueData.capacity);
      newVenue.pricePerDay = Number(venueData.pricePerDay);
    } else if (venueData.type === 'chalet') {
      newVenue.rooms = Number(venueData.rooms);
      newVenue.bathrooms = Number(venueData.bathrooms);
      newVenue.checkInTime = venueData.checkInTime ? this.formatTimeToHHMMSS(venueData.checkInTime) : undefined;
      newVenue.checkoutTime = venueData.checkoutTime ? this.formatTimeToHHMMSS(venueData.checkoutTime) : undefined;
    }

    console.log('Prepared venue data for API:', newVenue);

    return this.api.post<Venue>(this.apiUrl, newVenue).pipe(
      tap(venue => {
        this.notifyAdmins(venue);

        this.notificationService.createNotification({
          userId: ownerId,
          type: 'venue-submission',
          message: `Your venue "${venue.title}" has been submitted and is pending approval.`,
          read: false,
          metadata: {
            venueId: venue.id,
            status: 'pending'
          }
        }).subscribe();
      })
    );
  }


  updateVenueStatus(venueId: string, status: "approved" | "rejected"): Observable<Venue> {
    return this.api.patch<Venue>(`${this.apiUrl}/${venueId}`, { status });
  }

  getOwnerDetails(ownerId: string): Observable<{ name: string; phone: string; email: string }> {
    return this.api.get<any>(`${this.apiUrl}/owner/${ownerId}`).pipe(
      map(ownerDetails => ({
        name: ownerDetails.name || ownerDetails.username || 'Unknown',
        phone: ownerDetails.phone || ownerDetails.phoneNumber || 'N/A',
        email: ownerDetails.email || 'N/A'
      })),
      catchError(error => {
        console.error('Error fetching owner details:', error);
        return of({
          name: 'Error loading owner',
          phone: 'N/A',
          email: 'N/A'
        });
      })
    );
  }

  getOwnerPhone(ownerId: string): Observable<string> {
    return of('Not available');
  }

  getRequestsByUser(userId: string): Observable<any[]> {
    return this.api.get<any[]>(`bookings/my-bookings`).pipe(
      switchMap((requests) => {
        if (!requests || requests.length === 0) {
          return of([]);
        }
        return forkJoin(
          requests.map((request) =>
            this.getVenueById(request.venueId).pipe(
              map(venue => ({
                ...request,
                dates: {
                  start: request.startDate || null,
                  end: request.endDate || null,
                },
                venue,
                user: {
                  phone: request.customerPhone || null,
                },
                totalPrice: request.totalPrice || 0,
                checkInTime: request.checkInTime || null,
                checkOutTime: request.checkOutTime || null,
              }))
            )
          )
        );
      })
    );
  }

  getRequestsForVenue(venueId: string): Observable<any[]> {
    return this.api.get<any[]>(`bookings/requests/venue/${venueId}`).pipe(
      switchMap((requests) => {
        if (!requests || requests.length === 0) {
          return of([]);
        }
        return forkJoin(
          requests.map((request) =>
            this.getVenueById(request.venueId).pipe(
              map(venue => ({
                ...request,
                dates: {
                  start: request.startDate || null,
                  end: request.endDate || null,
                },
                venue,
                user: {
                  phone: request.customerPhone || null,
                },
                totalPrice: request.totalPrice || 0,
                checkInTime: request.checkInTime || null,
                checkOutTime: request.checkOutTime || null,
              }))
            )
          )
        );
      })
    );
  }

  deleteRequest(requestId: string): Observable<any> {
    return this.api.delete(`Requests/${requestId}`);
  }

  getMyVenues(): Observable<Venue[]> {
    return this.api.get<Venue[]>(`${this.apiUrl}/my-venues`).pipe(
      map((venues) => Array.isArray(venues) ? venues : []),
      tap((venues) => console.log('Loaded my venues:', venues))
    );
  }

  updateRequestStatus(
    requestId: string,
    status: "accepted" | "denied"
  ): Observable<Request> {
    return this.api.patch<Request>(`requests/${requestId}`, { status });
  }

  acceptRequest(requestId: string): Observable<any> {
    return this.api.post<any>(`bookings/${requestId}/accept`, {});
  }

  denyRequest(requestId: string): Observable<any> {
    return this.api.post<any>(`bookings/${requestId}/deny`, {});
  }

  getVenueAvailability(venueId: string): Observable<string[]> {
    return this.api.get<Venue>(`${this.apiUrl}/${venueId}`).pipe(
      map((venue) => {
        if (!venue.unavailableDates) return [];

        const minDate = new Date();
        const maxDate = new Date();
        maxDate.setMonth(minDate.getMonth() + 3);

        const allDates = this.getDatesInRange(minDate, maxDate);
        const unavailableDates = venue.unavailableDates.map(
          (d) => new Date(d).toISOString().split("T")[0]
        );

        return allDates
          .filter(
            (date: Date) =>
              !unavailableDates.includes(date.toISOString().split("T")[0])
          )
          .map((date: Date) => date.toISOString());
      })
    );
  }

  private getPricingTime(pricing: any[], timeType: string): string | null {
    if (!pricing || pricing.length === 0) return null;
    const priceOption = pricing[0];
    return priceOption[timeType] || null;
  }

  updateUnavailableDates(venueId: string, dates: string[]): Observable<Venue> {
    if (!this.unavailableDatesStore[venueId]) {
      this.unavailableDatesStore[venueId] = [];
    }

    this.unavailableDatesStore[venueId] = Array.from(
      new Set([...this.unavailableDatesStore[venueId], ...dates])
    );

    return of({
      id: venueId,
      unavailableDates: this.unavailableDatesStore[venueId],
    } as Venue);
  }

  getAcceptedBookingDates(): Observable<Date[]> {
    return this.http.get<Date[]>("/api/bookings/accept").pipe(
      map((dates) => dates.map((dateStr) => new Date(dateStr))),
      catchError(() => of([]))
    );
  }

  getPendingVenues(): Observable<Venue[]> {
    return this.http.get<Venue[]>(`${this.apiUrl}?status=pending`);
  }

  addAcceptedRequestDatesToAvailability(request: Request): void {
    if (!request || !request.dates || !request.dates.start) {
      console.error("Invalid request or missing dates.");
      return;
    }

    this.getVenueById(request.venueId).subscribe({
      next: (venue) => {
        if (!venue.availability) {
          venue.availability = [];
        }

        const startDate = new Date(request.dates.start);
        const year = startDate.getFullYear();
        const month = String(startDate.getMonth() + 1).padStart(2, '0');
        const day = String(startDate.getDate()).padStart(2, '0');
        const dateString = `${year}-${month}-${day}`;

        console.log(`Adding accepted date to availability: ${dateString} (from ${request.dates.start})`);
        console.log(`Venue type: ${venue.type}`);

        const updatedVenue = JSON.parse(JSON.stringify(venue));
        let needsUpdate = false;

        console.log(`BEFORE: Venue has ${updatedVenue.globalTimeSlots?.length || 0} global time slots`);

        if (venue.type === 'wedding-hall') {
          let dateAvailability = updatedVenue.availability.find((a: { date: string }) => a.date === dateString);

          let startTime = request.weddingHallCheckInTime ?? request.startDate;
          let endTime = request.weddingHallCheckoutTime ?? request.endDate;

          const startDateTime = new Date(startTime);
          const endDateTime = new Date(endTime);

          const [reqYear, reqMonth, reqDay] = dateString.split('-').map(Number);

          startDateTime.setFullYear(reqYear, reqMonth - 1, reqDay);
          endDateTime.setFullYear(reqYear, reqMonth - 1, reqDay);

          startTime = startDateTime.toISOString();
          endTime = endDateTime.toISOString();

          console.log(`Wedding hall booking time: ${new Date(startTime).toLocaleTimeString()} - ${new Date(endTime).toLocaleTimeString()}`);

          if (!dateAvailability) {
            dateAvailability = {
              date: dateString,
              unavailableTimes: [{
                startTime,
                endTime,
                bookingId: request.id
              }],
              fullyBooked: false
            };
            updatedVenue.availability.push(dateAvailability);
            console.log(`Created new availability entry for wedding hall date: ${dateString}`);
            needsUpdate = true;
          } else {
            dateAvailability.unavailableTimes = dateAvailability.unavailableTimes || [];

            const alreadyBooked = dateAvailability.unavailableTimes.some((slot: { startTime: string, endTime: string }) => {
              const existingStart = new Date(slot.startTime).getTime();
              const existingEnd = new Date(slot.endTime).getTime();
              const newStart = new Date(startTime).getTime();
              const newEnd = new Date(endTime).getTime();

              const startDiffMs = Math.abs(existingStart - newStart);
              const endDiffMs = Math.abs(existingEnd - newEnd);

              return startDiffMs < 300000 && endDiffMs < 300000;
            });

            if (!alreadyBooked) {
              const newUnavailableTime = {
                startTime,
                endTime,
                bookingId: request.id
              };
              dateAvailability.unavailableTimes.push(newUnavailableTime);
              console.log(`Added unavailable time to existing wedding hall date: ${dateString}`);
              needsUpdate = true;
            } else {
              console.log(`Time slot already marked as unavailable for date: ${dateString}`);
            }
          }

          console.log(`This date now has ${dateAvailability.unavailableTimes.length} unavailable time slots:`);
          dateAvailability.unavailableTimes.forEach((slot: { startTime: string, endTime: string }, index: number) => {
            console.log(`  - Unavailable #${index + 1}: ${new Date(slot.startTime).toLocaleTimeString()} - ${new Date(slot.endTime).toLocaleTimeString()}`);
          });

          const globalSlots = updatedVenue.globalTimeSlots || [];
          console.log(`Wedding hall has ${globalSlots.length} global time slots`);

          const unavailableTimes = dateAvailability.unavailableTimes || [];
          console.log(`Wedding hall date has ${unavailableTimes.length} unavailable time slots`);

          const availableSlots = this.getAvailableTimeSlots(dateString, globalSlots, unavailableTimes);
          console.log(`Wedding hall date has ${availableSlots.length} available time slots remaining`);

          if (availableSlots.length === 0 && globalSlots.length > 0) {
            dateAvailability.fullyBooked = true;
            if (!updatedVenue.unavailableDates) {
              updatedVenue.unavailableDates = [];
            }
            if (!updatedVenue.unavailableDates.includes(dateString)) {
              updatedVenue.unavailableDates.push(dateString);
              console.log(`Wedding hall date fully booked, adding to unavailable dates: ${dateString}`);
              needsUpdate = true;
            }
          } else {
            dateAvailability.fullyBooked = false;
            if (updatedVenue.unavailableDates && updatedVenue.unavailableDates.includes(dateString)) {
              updatedVenue.unavailableDates = updatedVenue.unavailableDates.filter((d: string) => d !== dateString);
              console.log(`Wedding hall date still has slots available, removing from unavailable dates: ${dateString}`);
              needsUpdate = true;
            }
          }
        } else {
          let dateAvailability = updatedVenue.availability.find((a: { date: string }) => a.date === dateString);

          const standardizedDuration = this.standardizeDuration(request.duration || '');
          const is24HourBooking = standardizedDuration === '24';
          const is12HourBooking = standardizedDuration === '12' ||
            standardizedDuration === '12-morning' ||
            standardizedDuration === '12-evening';

          const isMorningBooking = standardizedDuration === '12-morning' ||
            (is12HourBooking && request.timeSlot === 'morning');
          const isEveningBooking = standardizedDuration === '12-evening' ||
            (is12HourBooking && request.timeSlot === 'evening');

          console.log(`  - Duration: ${request.duration}, standardized: ${standardizedDuration}`);
          console.log(`  - Is 24-hour booking: ${is24HourBooking}, Is 12-hour booking: ${is12HourBooking}`);
          console.log(`  - Is morning booking: ${isMorningBooking}, Is evening booking: ${isEveningBooking}`);
          console.log(`  - Time slot from request: ${request.timeSlot || 'not specified'}`);

          if (!dateAvailability) {
            dateAvailability = {
              date: dateString,
              unavailableTimes: [{
                startTime: request.startDate,
                endTime: request.endDate,
                bookingId: request.id
              }],
              fullyBooked: is24HourBooking,
              amBooked: is24HourBooking || isMorningBooking,
              pmBooked: is24HourBooking || isEveningBooking
            };

            if (is12HourBooking && !isMorningBooking && !isEveningBooking) {
              const startHour = startDate.getHours();
              const isAMBooking = startHour < 12;
              console.log(`  - Determining time slot based on hour ${startHour}: ${isAMBooking ? 'morning' : 'evening'}`);

              dateAvailability.amBooked = isAMBooking;
              dateAvailability.pmBooked = !isAMBooking;
            }

            updatedVenue.availability.push(dateAvailability);
            needsUpdate = true;
          } else {
            dateAvailability.unavailableTimes = dateAvailability.unavailableTimes || [];

            const alreadyBooked = dateAvailability.unavailableTimes.some((slot: { startTime: string, endTime: string }) => {
              const existingStart = new Date(slot.startTime).getTime();
              const existingEnd = new Date(slot.endTime).getTime();
              const newStart = new Date(request.startDate).getTime();
              const newEnd = new Date(request.endDate).getTime();

              const startDiffMs = Math.abs(existingStart - newStart);
              const endDiffMs = Math.abs(existingEnd - newEnd);

              return startDiffMs < 300000 && endDiffMs < 300000;
            });

            if (!alreadyBooked) {
              dateAvailability.unavailableTimes.push({
                startTime: request.startDate,
                endTime: request.endDate,
                bookingId: request.id
              });
            } else {
              console.log(`  - Time slot already recorded for date ${dateString}`);
            }

            if (is24HourBooking) {
              dateAvailability.fullyBooked = true;
              dateAvailability.amBooked = true;
              dateAvailability.pmBooked = true;
            } else if (is12HourBooking) {
              if (isMorningBooking) {
                dateAvailability.amBooked = true;
                console.log(`  - Marking morning as booked`);
              } else if (isEveningBooking) {
                dateAvailability.pmBooked = true;
                console.log(`  - Marking evening as booked`);
              } else {
                const startHour = startDate.getHours();
                const isAMBooking = startHour < 12;
                console.log(`  - Determining time slot based on hour ${startHour}: ${isAMBooking ? 'morning' : 'evening'}`);

                if (isAMBooking) {
                  dateAvailability.amBooked = true;
                } else {
                  dateAvailability.pmBooked = true;
                }
              }

              if (dateAvailability.amBooked && dateAvailability.pmBooked) {
                dateAvailability.fullyBooked = true;
                console.log(`  - Both AM and PM are now booked, marking date as fully booked`);
              }
            } else {
              dateAvailability.fullyBooked = true;
              dateAvailability.amBooked = true;
              dateAvailability.pmBooked = true;
            }
            needsUpdate = true;
          }

          if (!updatedVenue.unavailableDates) {
            updatedVenue.unavailableDates = [];
          }

          if (dateAvailability.fullyBooked) {
            if (!updatedVenue.unavailableDates.includes(dateString)) {
              updatedVenue.unavailableDates.push(dateString);
              console.log(`  - Date marked as fully booked, adding to unavailable dates: ${dateString}`);
              needsUpdate = true;
            }
          }
        }

        console.log(`AFTER: Venue has ${updatedVenue.globalTimeSlots?.length || 0} global time slots`);

        if (needsUpdate) {
          const venueUpdate: Partial<Venue> = {
            availability: updatedVenue.availability,
            unavailableDates: updatedVenue.unavailableDates
          };

          console.log('Updating venue with new availability data using PATCH to preserve other fields');
          this.api.put<Venue>(`${this.apiUrl}/${venue.id}`, venueUpdate).subscribe({
            next: () => {
              console.log('Venue availability successfully updated');
            },
            error: (error) => {
              console.error('Error updating venue availability:', error);
            }
          });
        } else {
          console.log('No changes needed to venue availability');
        }
      },
      error: (error) => {
        console.error('Error getting venue for availability update:', error);
      }
    });
  }

  addAcceptedDate(date: string): void {
    if (!this.acceptedDates.includes(date)) {
      this.acceptedDates.push(date);
    }
  }

  getAcceptedDates(): string[] {
    return this.acceptedDates;
  }

  deleteVenue(venueId: string): Observable<any> {
    return this.api.delete(`${this.apiUrl}/${venueId}`).pipe(
      map(() => true),
      catchError((err) => throwError(() => err))
    );
  }

  cancelRequest(requestId: string): Observable<boolean> {
    return this.api.post<boolean>(`bookings/${requestId}/cancel`, {});
  }

  notifyOwnerOfCancellation(ownerId: string, venueTitle: string, requestId: string, venueId: string) {
    return this.notificationService.createNotification({
      userId: ownerId,
      type: 'booking-cancelled',
      message: `A booking for ${venueTitle} was cancelled by the user.`,
      read: false,
      metadata: {
        requestId,
        venueId
      }
    });
  }

  uploadMainPicture(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);

    const apiUrl = environment.backendUrl;
    const token = LocalStorageService.AccessToken;
    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : undefined;

    console.log(`Uploading main picture to: ${apiUrl}/api/Venues/upload-main-picture`);

    return this.http.post<{ thumbnailUrl: string }>(`${apiUrl}/api/Venues/upload-main-picture`, formData, { headers })
      .pipe(
        map(res => {
          console.log('Upload main picture response:', res);
          return this.prependBackendUrl(res.thumbnailUrl);
        }),
        catchError(error => {
          console.error('Error uploading main picture:', error);
          console.error('Failed to upload main picture. Please try again.');
          return throwError(() => error);
        })
      );
  }

  uploadAdditionalPhoto(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);

    const apiUrl = environment.backendUrl;
    const token = LocalStorageService.AccessToken;
    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : undefined;

    console.log(`Uploading additional photo to: ${apiUrl}/api/Venues/upload-additional-photo`);

    return this.http.post<{ thumbnailUrl: string }>(`${apiUrl}/api/Venues/upload-additional-photo`, formData, { headers })
      .pipe(
        map(res => {
          console.log('Upload additional photo response:', res);
          return this.prependBackendUrl(res.thumbnailUrl);
        }),
        catchError(error => {
          console.error('Error uploading additional photo:', error);
          console.error('Failed to upload additional photo. Please try again.');
          return throwError(() => error);
        })
      );
  }

  private prependBackendUrl(url: string): string {
    if (!url) return url;
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    const normalized = url.startsWith('/') ? url.substring(1) : url;
    return `${environment.backendUrl}/${normalized}`;
  }

  getBackendUrl(): string {
    return environment.backendUrl;
  }

  fixPhotoUrls(photos: any[]): string[] {
    if (!photos || photos.length === 0) {
      return ['/assets/images/venues/placeholder.svg'];
    }

    return photos.map(photo => {
      if (!photo) return '/assets/images/venues/placeholder.svg';

      if (typeof photo === 'object' && photo.photoUrl) {
        photo = photo.photoUrl;
      }

      if (typeof photo === 'string') {
        if (photo.startsWith('http://') || photo.startsWith('https://')) {
          return photo;
        }

        if (photo.includes('thumbnails')) {
          return `${environment.backendUrl}/${photo.startsWith('/') ? photo.substring(1) : photo}`;
        }

        if (photo.startsWith('/')) {
          photo = photo.substring(1);
        }

        if (!photo.startsWith('images/')) {
          photo = `images/thumbnails/${photo}`;
        } else if (!photo.includes('thumbnails')) {
          photo = photo.replace('images/', 'images/thumbnails/');
        }

        return `${environment.backendUrl}/${photo}`;
      }

      return '/assets/images/venues/placeholder.svg';
    });
  }

  private getDatesInRange(start: Date, end: Date): Date[] {
    const dates: Date[] = [];
    let current = new Date(start);
    current.setHours(0, 0, 0, 0);
    while (current <= end) {
      dates.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    return dates;
  }


  private getAvailableTimeSlots(dateString: string, globalSlots: any[], unavailableTimes: any[]): any[] {
    return [];
  }


  private standardizeDuration(duration: string): string {
    return duration || '24';
  }
}