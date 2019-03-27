/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Config } from '../config/config.service';
import { Requestor } from '../requestor/requestor.service';
import { Session } from '../session/session.service';
import { GeoLocation, Position } from '@shared/common';
export class Smartloc {
    /**
     * @param {?} session
     * @param {?} geoLoc
     * @param {?} config
     * @param {?} rq
     */
    constructor(session, geoLoc, config, rq) {
        this.session = session;
        this.geoLoc = geoLoc;
        this.config = config;
        this.rq = rq;
    }
    /**
     * @return {?}
     */
    get defaultPosition() {
        return this.geoLoc.defaultPosition;
    }
    /**
     * @param {?=} forceRefresh
     * @return {?}
     */
    getLocation(forceRefresh = false) {
        if (this.hasRole('store') && !this.hasRole('admin')) {
            /** @type {?} */
            let promise;
            if (this.session.user && this.session.user.location && this.session.user.location._geoloc) {
                promise = Promise.resolve(this.session.user.location);
            }
            else if (this.session.user && this.session.user.locationRef) {
                promise = this.getLocationEntity(this.session.user.locationRef); //, ['_id', 'title', '_geoloc', 'address']
            }
            else if (this.session.user && this.session.user.address && this.session.user.address._geoloc) {
                promise = Promise.resolve(this.session.user.address);
            }
            if (promise) {
                return promise.then((/**
                 * @param {?} loc
                 * @return {?}
                 */
                loc => {
                    if (loc && loc._geoloc && loc._geoloc.length > 1) {
                        this.session.user.location = loc;
                        /** @type {?} */
                        let position = new Position({ latitude: loc._geoloc[1], longitude: loc._geoloc[0] });
                        return position;
                    }
                    return null;
                }));
            }
        }
        return this.geoLoc.getLocation(forceRefresh);
    }
    /**
     * @param {?} lat1
     * @param {?} lon1
     * @param {?} lat2
     * @param {?} lon2
     * @param {?=} unit
     * @return {?}
     */
    getDistance(lat1, lon1, lat2, lon2, unit = 'K') {
        return this.geoLoc.getDistance(lat1, lon1, lat2, lon2, unit);
    }
    /**
     * @param {?} id
     * @return {?}
     */
    getLocationEntity(id) {
        /** @type {?} */
        let url = this.config.apiUrl + 'locations' + '/' + id;
        return this.rq.get(url).toPromise();
    }
    /**
     * @param {?} role
     * @return {?}
     */
    hasRole(role) {
        return this.session.roles && this.session.roles.indexOf(role) >= 0;
    }
}
Smartloc.decorators = [
    { type: Injectable }
];
/** @nocollapse */
Smartloc.ctorParameters = () => [
    { type: Session },
    { type: GeoLocation },
    { type: Config },
    { type: Requestor }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    Smartloc.prototype.session;
    /**
     * @type {?}
     * @private
     */
    Smartloc.prototype.geoLoc;
    /**
     * @type {?}
     * @private
     */
    Smartloc.prototype.config;
    /**
     * @type {?}
     * @private
     */
    Smartloc.prototype.rq;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRsb2Muc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL2RhdGEtY29yZS8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9zbWFydGxvYy9zbWFydGxvYy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDM0QsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3JELE9BQU8sRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHdkQsTUFBTSxPQUFPLFFBQVE7Ozs7Ozs7SUFDbkIsWUFBb0IsT0FBZ0IsRUFBVSxNQUFtQixFQUFVLE1BQWMsRUFBVSxFQUFhO1FBQTVGLFlBQU8sR0FBUCxPQUFPLENBQVM7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFhO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLE9BQUUsR0FBRixFQUFFLENBQVc7SUFBRyxDQUFDOzs7O0lBRXBILElBQUksZUFBZTtRQUNqQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDO0lBQ3JDLENBQUM7Ozs7O0lBRUQsV0FBVyxDQUFDLFlBQVksR0FBRyxLQUFLO1FBQzlCLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7O2dCQUMvQyxPQUFPO1lBQ1gsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRTtnQkFDekYsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDdkQ7aUJBQU0sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7Z0JBQzdELE9BQU8sR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQywwQ0FBMEM7YUFDNUc7aUJBQU0sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRTtnQkFDOUYsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDdEQ7WUFDRCxJQUFJLE9BQU8sRUFBRTtnQkFDWCxPQUFPLE9BQU8sQ0FBQyxJQUFJOzs7O2dCQUFDLEdBQUcsQ0FBQyxFQUFFO29CQUN4QixJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUMsT0FBTyxJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTt3QkFDaEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQzs7NEJBQzdCLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQyxFQUFFLFFBQVEsRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLFNBQVMsRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7d0JBQ3BGLE9BQU8sUUFBUSxDQUFDO3FCQUNqQjtvQkFDRCxPQUFPLElBQUksQ0FBQztnQkFDZCxDQUFDLEVBQUMsQ0FBQzthQUNKO1NBQ0Y7UUFDRCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQy9DLENBQUM7Ozs7Ozs7OztJQUVELFdBQVcsQ0FBQyxJQUFZLEVBQUUsSUFBWSxFQUFFLElBQVksRUFBRSxJQUFZLEVBQUUsSUFBSSxHQUFHLEdBQUc7UUFDNUUsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDL0QsQ0FBQzs7Ozs7SUFFRCxpQkFBaUIsQ0FBQyxFQUFFOztZQUNkLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxXQUFXLEdBQUcsR0FBRyxHQUFHLEVBQUU7UUFDckQsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUN0QyxDQUFDOzs7OztJQUVELE9BQU8sQ0FBQyxJQUFZO1FBQ2xCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNyRSxDQUFDOzs7WUEzQ0YsVUFBVTs7OztZQUhGLE9BQU87WUFDUCxXQUFXO1lBSFgsTUFBTTtZQUNOLFNBQVM7Ozs7Ozs7SUFNSiwyQkFBd0I7Ozs7O0lBQUUsMEJBQTJCOzs7OztJQUFFLDBCQUFzQjs7Ozs7SUFBRSxzQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tICcuLi9jb25maWcvY29uZmlnLnNlcnZpY2UnO1xuaW1wb3J0IHsgUmVxdWVzdG9yIH0gZnJvbSAnLi4vcmVxdWVzdG9yL3JlcXVlc3Rvci5zZXJ2aWNlJztcbmltcG9ydCB7IFNlc3Npb24gfSBmcm9tICcuLi9zZXNzaW9uL3Nlc3Npb24uc2VydmljZSc7XG5pbXBvcnQgeyBHZW9Mb2NhdGlvbiwgUG9zaXRpb24gfSBmcm9tICdAc2hhcmVkL2NvbW1vbic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTbWFydGxvYyB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc2Vzc2lvbjogU2Vzc2lvbiwgcHJpdmF0ZSBnZW9Mb2M6IEdlb0xvY2F0aW9uLCBwcml2YXRlIGNvbmZpZzogQ29uZmlnLCBwcml2YXRlIHJxOiBSZXF1ZXN0b3IpIHt9XG5cbiAgZ2V0IGRlZmF1bHRQb3NpdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5nZW9Mb2MuZGVmYXVsdFBvc2l0aW9uO1xuICB9XG5cbiAgZ2V0TG9jYXRpb24oZm9yY2VSZWZyZXNoID0gZmFsc2UpOiBQcm9taXNlPFBvc2l0aW9uPiB7XG4gICAgaWYgKHRoaXMuaGFzUm9sZSgnc3RvcmUnKSAmJiAhdGhpcy5oYXNSb2xlKCdhZG1pbicpKSB7XG4gICAgICBsZXQgcHJvbWlzZTtcbiAgICAgIGlmICh0aGlzLnNlc3Npb24udXNlciAmJiB0aGlzLnNlc3Npb24udXNlci5sb2NhdGlvbiAmJiB0aGlzLnNlc3Npb24udXNlci5sb2NhdGlvbi5fZ2VvbG9jKSB7XG4gICAgICAgIHByb21pc2UgPSBQcm9taXNlLnJlc29sdmUodGhpcy5zZXNzaW9uLnVzZXIubG9jYXRpb24pO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLnNlc3Npb24udXNlciAmJiB0aGlzLnNlc3Npb24udXNlci5sb2NhdGlvblJlZikge1xuICAgICAgICBwcm9taXNlID0gdGhpcy5nZXRMb2NhdGlvbkVudGl0eSh0aGlzLnNlc3Npb24udXNlci5sb2NhdGlvblJlZik7IC8vLCBbJ19pZCcsICd0aXRsZScsICdfZ2VvbG9jJywgJ2FkZHJlc3MnXVxuICAgICAgfSBlbHNlIGlmICh0aGlzLnNlc3Npb24udXNlciAmJiB0aGlzLnNlc3Npb24udXNlci5hZGRyZXNzICYmIHRoaXMuc2Vzc2lvbi51c2VyLmFkZHJlc3MuX2dlb2xvYykge1xuICAgICAgICBwcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKHRoaXMuc2Vzc2lvbi51c2VyLmFkZHJlc3MpO1xuICAgICAgfVxuICAgICAgaWYgKHByb21pc2UpIHtcbiAgICAgICAgcmV0dXJuIHByb21pc2UudGhlbihsb2MgPT4ge1xuICAgICAgICAgIGlmIChsb2MgJiYgbG9jLl9nZW9sb2MgJiYgbG9jLl9nZW9sb2MubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgdGhpcy5zZXNzaW9uLnVzZXIubG9jYXRpb24gPSBsb2M7XG4gICAgICAgICAgICBsZXQgcG9zaXRpb24gPSBuZXcgUG9zaXRpb24oeyBsYXRpdHVkZTogbG9jLl9nZW9sb2NbMV0sIGxvbmdpdHVkZTogbG9jLl9nZW9sb2NbMF0gfSk7XG4gICAgICAgICAgICByZXR1cm4gcG9zaXRpb247XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZ2VvTG9jLmdldExvY2F0aW9uKGZvcmNlUmVmcmVzaCk7XG4gIH1cblxuICBnZXREaXN0YW5jZShsYXQxOiBudW1iZXIsIGxvbjE6IG51bWJlciwgbGF0MjogbnVtYmVyLCBsb24yOiBudW1iZXIsIHVuaXQgPSAnSycpIHtcbiAgICByZXR1cm4gdGhpcy5nZW9Mb2MuZ2V0RGlzdGFuY2UobGF0MSwgbG9uMSwgbGF0MiwgbG9uMiwgdW5pdCk7XG4gIH1cblxuICBnZXRMb2NhdGlvbkVudGl0eShpZCkge1xuICAgIGxldCB1cmwgPSB0aGlzLmNvbmZpZy5hcGlVcmwgKyAnbG9jYXRpb25zJyArICcvJyArIGlkO1xuICAgIHJldHVybiB0aGlzLnJxLmdldCh1cmwpLnRvUHJvbWlzZSgpO1xuICB9XG5cbiAgaGFzUm9sZShyb2xlOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5zZXNzaW9uLnJvbGVzICYmIHRoaXMuc2Vzc2lvbi5yb2xlcy5pbmRleE9mKHJvbGUpID49IDA7XG4gIH1cbn1cbiJdfQ==