/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { toDate, utc, dateAdd, startOf } from '@shared/stencil';
/**
 * @param {?} timescale
 * @param {?=} endDate
 * @param {?=} amount
 * @param {?=} notsliding
 * @return {?}
 */
export function getStartAndEndDates(timescale, endDate, amount, notsliding) {
    /** @type {?} */
    var lastDate = endDate ? toDate(endDate) : new Date();
    amount = amount || 7;
    /** @type {?} */
    var period = 'days';
    /** @type {?} */
    var startof = 'day';
    switch (timescale) {
        case 'last30days':
            amount = 30;
            period = 'days';
            break;
        case 'last90days':
            amount = 90;
            period = 'days';
            break;
        case 'last365days':
            amount = 365;
            period = 'days';
            break;
        case 'lastweek':
            amount = 0;
            period = 'weeks';
            break;
        case 'lastmonth':
            amount = 0;
            period = 'months';
            startof = 'month';
            break;
        case 'lastquarter':
            amount = 2;
            period = 'months';
            startof = 'month';
            break;
        case 'lastyear':
            amount = 0;
            period = 'years';
            startof = 'year';
            break;
        case 'last7days':
            amount = 7;
            period = 'days';
            startof = 'day';
            break;
        default:
            if (notsliding) {
                amount = amount ? amount - 1 : 0;
                period = timescale;
                startof = timescale;
            }
            else {
                amount = amount || 1;
                period = timescale;
                startof = 'day';
            }
            break;
    }
    //use .utc() to get the startOf with no offset issues
    return [startOf(dateAdd(utc(lastDate), period, -amount), startof).toISOString(), lastDate.toISOString()];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZXMuaW50ZXJmYWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vZGF0YS1jb3JlLyIsInNvdXJjZXMiOlsibGliL2ludGVyZmFjZXMvZGF0ZXMvZGF0ZXMuaW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0saUJBQWlCLENBQUM7Ozs7Ozs7O0FBRWhFLE1BQU0sVUFBVSxtQkFBbUIsQ0FBQyxTQUFTLEVBQUUsT0FBdUIsRUFBRSxNQUFlLEVBQUUsVUFBb0I7O1FBQ3ZHLFFBQVEsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLEVBQUU7SUFDckQsTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLENBQUM7O1FBQ2pCLE1BQU0sR0FBRyxNQUFNOztRQUNmLE9BQU8sR0FBRyxLQUFLO0lBQ25CLFFBQVEsU0FBUyxFQUFFO1FBQ2pCLEtBQUssWUFBWTtZQUNmLE1BQU0sR0FBRyxFQUFFLENBQUM7WUFDWixNQUFNLEdBQUcsTUFBTSxDQUFDO1lBQ2hCLE1BQU07UUFDUixLQUFLLFlBQVk7WUFDZixNQUFNLEdBQUcsRUFBRSxDQUFDO1lBQ1osTUFBTSxHQUFHLE1BQU0sQ0FBQztZQUNoQixNQUFNO1FBQ1IsS0FBSyxhQUFhO1lBQ2hCLE1BQU0sR0FBRyxHQUFHLENBQUM7WUFDYixNQUFNLEdBQUcsTUFBTSxDQUFDO1lBQ2hCLE1BQU07UUFDUixLQUFLLFVBQVU7WUFDYixNQUFNLEdBQUcsQ0FBQyxDQUFDO1lBQ1gsTUFBTSxHQUFHLE9BQU8sQ0FBQztZQUNqQixNQUFNO1FBQ1IsS0FBSyxXQUFXO1lBQ2QsTUFBTSxHQUFHLENBQUMsQ0FBQztZQUNYLE1BQU0sR0FBRyxRQUFRLENBQUM7WUFDbEIsT0FBTyxHQUFHLE9BQU8sQ0FBQztZQUNsQixNQUFNO1FBQ1IsS0FBSyxhQUFhO1lBQ2hCLE1BQU0sR0FBRyxDQUFDLENBQUM7WUFDWCxNQUFNLEdBQUcsUUFBUSxDQUFDO1lBQ2xCLE9BQU8sR0FBRyxPQUFPLENBQUM7WUFDbEIsTUFBTTtRQUNSLEtBQUssVUFBVTtZQUNiLE1BQU0sR0FBRyxDQUFDLENBQUM7WUFDWCxNQUFNLEdBQUcsT0FBTyxDQUFDO1lBQ2pCLE9BQU8sR0FBRyxNQUFNLENBQUM7WUFDakIsTUFBTTtRQUNSLEtBQUssV0FBVztZQUNkLE1BQU0sR0FBRyxDQUFDLENBQUM7WUFDWCxNQUFNLEdBQUcsTUFBTSxDQUFDO1lBQ2hCLE9BQU8sR0FBRyxLQUFLLENBQUM7WUFDaEIsTUFBTTtRQUVSO1lBQ0UsSUFBSSxVQUFVLEVBQUU7Z0JBQ2QsTUFBTSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNqQyxNQUFNLEdBQUcsU0FBUyxDQUFDO2dCQUNuQixPQUFPLEdBQUcsU0FBUyxDQUFDO2FBQ3JCO2lCQUFNO2dCQUNMLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxDQUFDO2dCQUNyQixNQUFNLEdBQUcsU0FBUyxDQUFDO2dCQUNuQixPQUFPLEdBQUcsS0FBSyxDQUFDO2FBQ2pCO1lBRUQsTUFBTTtLQUNUO0lBQ0QscURBQXFEO0lBQ3JELE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBRSxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztBQUMzRyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdG9EYXRlLCB1dGMsIGRhdGVBZGQsIHN0YXJ0T2YgfSBmcm9tICdAc2hhcmVkL3N0ZW5jaWwnO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3RhcnRBbmRFbmREYXRlcyh0aW1lc2NhbGUsIGVuZERhdGU/OiBEYXRlIHwgc3RyaW5nLCBhbW91bnQ/OiBudW1iZXIsIG5vdHNsaWRpbmc/OiBib29sZWFuKSB7XG4gIGxldCBsYXN0RGF0ZSA9IGVuZERhdGUgPyB0b0RhdGUoZW5kRGF0ZSkgOiBuZXcgRGF0ZSgpO1xuICBhbW91bnQgPSBhbW91bnQgfHwgNztcbiAgbGV0IHBlcmlvZCA9ICdkYXlzJztcbiAgbGV0IHN0YXJ0b2YgPSAnZGF5JztcbiAgc3dpdGNoICh0aW1lc2NhbGUpIHtcbiAgICBjYXNlICdsYXN0MzBkYXlzJzpcbiAgICAgIGFtb3VudCA9IDMwO1xuICAgICAgcGVyaW9kID0gJ2RheXMnO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnbGFzdDkwZGF5cyc6XG4gICAgICBhbW91bnQgPSA5MDtcbiAgICAgIHBlcmlvZCA9ICdkYXlzJztcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2xhc3QzNjVkYXlzJzpcbiAgICAgIGFtb3VudCA9IDM2NTtcbiAgICAgIHBlcmlvZCA9ICdkYXlzJztcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2xhc3R3ZWVrJzpcbiAgICAgIGFtb3VudCA9IDA7XG4gICAgICBwZXJpb2QgPSAnd2Vla3MnO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnbGFzdG1vbnRoJzpcbiAgICAgIGFtb3VudCA9IDA7XG4gICAgICBwZXJpb2QgPSAnbW9udGhzJztcbiAgICAgIHN0YXJ0b2YgPSAnbW9udGgnO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnbGFzdHF1YXJ0ZXInOlxuICAgICAgYW1vdW50ID0gMjtcbiAgICAgIHBlcmlvZCA9ICdtb250aHMnO1xuICAgICAgc3RhcnRvZiA9ICdtb250aCc7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdsYXN0eWVhcic6XG4gICAgICBhbW91bnQgPSAwO1xuICAgICAgcGVyaW9kID0gJ3llYXJzJztcbiAgICAgIHN0YXJ0b2YgPSAneWVhcic7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdsYXN0N2RheXMnOlxuICAgICAgYW1vdW50ID0gNztcbiAgICAgIHBlcmlvZCA9ICdkYXlzJztcbiAgICAgIHN0YXJ0b2YgPSAnZGF5JztcbiAgICAgIGJyZWFrO1xuXG4gICAgZGVmYXVsdDpcbiAgICAgIGlmIChub3RzbGlkaW5nKSB7XG4gICAgICAgIGFtb3VudCA9IGFtb3VudCA/IGFtb3VudCAtIDEgOiAwO1xuICAgICAgICBwZXJpb2QgPSB0aW1lc2NhbGU7XG4gICAgICAgIHN0YXJ0b2YgPSB0aW1lc2NhbGU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhbW91bnQgPSBhbW91bnQgfHwgMTtcbiAgICAgICAgcGVyaW9kID0gdGltZXNjYWxlO1xuICAgICAgICBzdGFydG9mID0gJ2RheSc7XG4gICAgICB9XG5cbiAgICAgIGJyZWFrO1xuICB9XG4gIC8vdXNlIC51dGMoKSB0byBnZXQgdGhlIHN0YXJ0T2Ygd2l0aCBubyBvZmZzZXQgaXNzdWVzXG4gIHJldHVybiBbc3RhcnRPZihkYXRlQWRkKHV0YyhsYXN0RGF0ZSksIHBlcmlvZCwgLWFtb3VudCksIHN0YXJ0b2YpLnRvSVNPU3RyaW5nKCksIGxhc3REYXRlLnRvSVNPU3RyaW5nKCldO1xufVxuIl19