/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
export const CONDITION_TYPES = ['field', 'tags', 'groups'];
/** @type {?} */
export const CONDITION_ALL_OPERATORS = ['equals', 'notequals', 'in', 'notin', 'greaterthan', 'lessthan'];
/** @type {?} */
export const SIMPLE_FIELD_TYPES = ['text', 'email', 'number', 'date', 'tel', 'time', 'range', 'starrating'];
/** @type {?} */
export const WITH_VALUES_FIELD_TYPES = ['checkbox', 'toggle', 'select', 'selectmulti', 'selectbuttons', 'selectbuttonsmulti', 'autocomplete'];
/**
 * @record
 */
export function ICondition() { }
if (false) {
    /** @type {?|undefined} */
    ICondition.prototype._id;
    /** @type {?|undefined} */
    ICondition.prototype.type;
    /** @type {?|undefined} */
    ICondition.prototype.operator;
    /** @type {?|undefined} */
    ICondition.prototype.title;
    /** @type {?|undefined} */
    ICondition.prototype.field;
    /** @type {?|undefined} */
    ICondition.prototype.tags;
    /** @type {?|undefined} */
    ICondition.prototype.group;
    /** @type {?|undefined} */
    ICondition.prototype.values;
    /** @type {?|undefined} */
    ICondition.prototype.value;
    /** @type {?|undefined} */
    ICondition.prototype.key;
}
/** @type {?} */
export const ROLES = [
    'dashboard',
    'admin',
    'manager',
    'team',
    'teamplus',
    'creator',
    'service',
    'supervisor',
    'quora',
    'kiosk',
    'score',
    'nochat',
    'anonymous',
    'stat',
    'todo',
    'serviceuser',
    'polluser',
    'newsuser',
    'newscreator',
    'documentsuser',
    'calendaruser',
    'store',
    'clientadmin',
    'missionanalysis',
    'missionviewer',
    'followup',
    'followupnouser',
    'profilenoedit',
    'workplace',
    'trial',
    'videocall',
    'academy',
    'pharmaone',
    'instagram',
    'taskuser',
    'taskcreator',
    'bi',
    'storeinsights',
    'healthscore',
    'visit',
    'imagereco',
    'productbatch',
    'taskassign',
    'scandit'
];
/** @type {?} */
export const ROLES_ASK = ['manager', 'creator', 'quora', 'academy', 'academyplus'];
/** @type {?} */
export const ROLES_CONDITIONS = {
    isAdmin: { type: 'roles', operator: 'in', group: ['admin'] },
    isClientAdmin: { type: 'roles', operator: 'in', group: ['clientadmin'] },
    isAdminOrClientAdmin: { type: 'roles', operator: 'in', group: ['admin', 'clientadmin'] },
    isNotAdmin: { type: 'roles', operator: 'nin', group: ['admin'] },
    isNeitherAdminNorClientAdmin: { type: 'roles', operator: 'nin', group: ['admin', 'clientadmin'] },
    isManager: { type: 'roles', operator: 'in', group: ['manager'] },
    isNotManager: { type: 'roles', operator: 'nin', group: ['manager', 'admin'] },
    isTeam: { type: 'roles', operator: 'in', group: ['team'] },
    isWorkplace: { type: 'roles', operator: 'in', group: ['admin', 'workplace'] },
    hasTodoOrScore: { type: 'roles', operator: 'in', group: ['todo', 'score'] },
    hasTodo: { type: 'roles', operator: 'in', group: ['todo'] },
    hasScore: { type: 'roles', operator: 'in', group: ['score'] },
    hasService: { type: 'roles', operator: 'in', group: ['admin', 'service'] },
    hasProductBatch: { type: 'roles', operator: 'in', group: ['admin', 'productbatch'] },
    hasMemoAssign: { type: 'roles', operator: 'in', group: ['admin', 'taskassign'] }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNvbmRpdGlvbi5pbnRlcmZhY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9kYXRhLWNvcmUvIiwic291cmNlcyI6WyJsaWIvaW50ZXJmYWNlcy9jb25kaXRpb24vaWNvbmRpdGlvbi5pbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxNQUFNLE9BQU8sZUFBZSxHQUFHLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxRQUFRLENBQUM7O0FBQzFELE1BQU0sT0FBTyx1QkFBdUIsR0FBRyxDQUFDLFFBQVEsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsVUFBVSxDQUFDOztBQUN4RyxNQUFNLE9BQU8sa0JBQWtCLEdBQUcsQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsWUFBWSxDQUFDOztBQUMzRyxNQUFNLE9BQU8sdUJBQXVCLEdBQUcsQ0FBQyxVQUFVLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUUsZUFBZSxFQUFFLG9CQUFvQixFQUFFLGNBQWMsQ0FBQzs7OztBQUU3SSxnQ0FXQzs7O0lBVkMseUJBQWE7O0lBQ2IsMEJBQWM7O0lBQ2QsOEJBQWtCOztJQUNsQiwyQkFBZTs7SUFDZiwyQkFBWTs7SUFDWiwwQkFBcUI7O0lBQ3JCLDJCQUFzQjs7SUFDdEIsNEJBQW9COztJQUNwQiwyQkFBWTs7SUFDWix5QkFBYTs7O0FBR2YsTUFBTSxPQUFPLEtBQUssR0FBRztJQUNuQixXQUFXO0lBQ1gsT0FBTztJQUNQLFNBQVM7SUFDVCxNQUFNO0lBQ04sVUFBVTtJQUNWLFNBQVM7SUFDVCxTQUFTO0lBQ1QsWUFBWTtJQUNaLE9BQU87SUFDUCxPQUFPO0lBQ1AsT0FBTztJQUNQLFFBQVE7SUFDUixXQUFXO0lBQ1gsTUFBTTtJQUNOLE1BQU07SUFDTixhQUFhO0lBQ2IsVUFBVTtJQUNWLFVBQVU7SUFDVixhQUFhO0lBQ2IsZUFBZTtJQUNmLGNBQWM7SUFDZCxPQUFPO0lBQ1AsYUFBYTtJQUNiLGlCQUFpQjtJQUNqQixlQUFlO0lBQ2YsVUFBVTtJQUNWLGdCQUFnQjtJQUNoQixlQUFlO0lBQ2YsV0FBVztJQUNYLE9BQU87SUFDUCxXQUFXO0lBQ1gsU0FBUztJQUNULFdBQVc7SUFDWCxXQUFXO0lBQ1gsVUFBVTtJQUNWLGFBQWE7SUFDYixJQUFJO0lBQ0osZUFBZTtJQUNmLGFBQWE7SUFDYixPQUFPO0lBQ1AsV0FBVztJQUNYLGNBQWM7SUFDZCxZQUFZO0lBQ1osU0FBUztDQUNWOztBQUVELE1BQU0sT0FBTyxTQUFTLEdBQUcsQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsYUFBYSxDQUFDOztBQUVsRixNQUFNLE9BQU8sZ0JBQWdCLEdBQUc7SUFDOUIsT0FBTyxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFO0lBQzVELGFBQWEsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxhQUFhLENBQUMsRUFBRTtJQUN4RSxvQkFBb0IsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxPQUFPLEVBQUUsYUFBYSxDQUFDLEVBQUU7SUFDeEYsVUFBVSxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFO0lBQ2hFLDRCQUE0QixFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDLE9BQU8sRUFBRSxhQUFhLENBQUMsRUFBRTtJQUNqRyxTQUFTLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUMsU0FBUyxDQUFDLEVBQUU7SUFDaEUsWUFBWSxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsRUFBRTtJQUM3RSxNQUFNLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUU7SUFDMUQsV0FBVyxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUMsRUFBRTtJQUM3RSxjQUFjLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxFQUFFO0lBQzNFLE9BQU8sRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRTtJQUMzRCxRQUFRLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUU7SUFDN0QsVUFBVSxFQUFFLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsRUFBRTtJQUMxRSxlQUFlLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUMsT0FBTyxFQUFFLGNBQWMsQ0FBQyxFQUFFO0lBQ3BGLGFBQWEsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxPQUFPLEVBQUUsWUFBWSxDQUFDLEVBQUU7Q0FDakYiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgQ09ORElUSU9OX1RZUEVTID0gWydmaWVsZCcsICd0YWdzJywgJ2dyb3VwcyddO1xuZXhwb3J0IGNvbnN0IENPTkRJVElPTl9BTExfT1BFUkFUT1JTID0gWydlcXVhbHMnLCAnbm90ZXF1YWxzJywgJ2luJywgJ25vdGluJywgJ2dyZWF0ZXJ0aGFuJywgJ2xlc3N0aGFuJ107XG5leHBvcnQgY29uc3QgU0lNUExFX0ZJRUxEX1RZUEVTID0gWyd0ZXh0JywgJ2VtYWlsJywgJ251bWJlcicsICdkYXRlJywgJ3RlbCcsICd0aW1lJywgJ3JhbmdlJywgJ3N0YXJyYXRpbmcnXTtcbmV4cG9ydCBjb25zdCBXSVRIX1ZBTFVFU19GSUVMRF9UWVBFUyA9IFsnY2hlY2tib3gnLCAndG9nZ2xlJywgJ3NlbGVjdCcsICdzZWxlY3RtdWx0aScsICdzZWxlY3RidXR0b25zJywgJ3NlbGVjdGJ1dHRvbnNtdWx0aScsICdhdXRvY29tcGxldGUnXTtcblxuZXhwb3J0IGludGVyZmFjZSBJQ29uZGl0aW9uIHtcbiAgX2lkPzogc3RyaW5nO1xuICB0eXBlPzogc3RyaW5nO1xuICBvcGVyYXRvcj86IHN0cmluZztcbiAgdGl0bGU/OiBzdHJpbmc7XG4gIGZpZWxkPzogYW55O1xuICB0YWdzPzogQXJyYXk8c3RyaW5nPjtcbiAgZ3JvdXA/OiBBcnJheTxzdHJpbmc+O1xuICB2YWx1ZXM/OiBBcnJheTxhbnk+O1xuICB2YWx1ZT86IGFueTtcbiAga2V5Pzogc3RyaW5nO1xufVxuXG5leHBvcnQgY29uc3QgUk9MRVMgPSBbXG4gICdkYXNoYm9hcmQnLFxuICAnYWRtaW4nLFxuICAnbWFuYWdlcicsXG4gICd0ZWFtJyxcbiAgJ3RlYW1wbHVzJyxcbiAgJ2NyZWF0b3InLFxuICAnc2VydmljZScsXG4gICdzdXBlcnZpc29yJyxcbiAgJ3F1b3JhJyxcbiAgJ2tpb3NrJyxcbiAgJ3Njb3JlJyxcbiAgJ25vY2hhdCcsXG4gICdhbm9ueW1vdXMnLFxuICAnc3RhdCcsXG4gICd0b2RvJyxcbiAgJ3NlcnZpY2V1c2VyJyxcbiAgJ3BvbGx1c2VyJyxcbiAgJ25ld3N1c2VyJyxcbiAgJ25ld3NjcmVhdG9yJyxcbiAgJ2RvY3VtZW50c3VzZXInLFxuICAnY2FsZW5kYXJ1c2VyJyxcbiAgJ3N0b3JlJyxcbiAgJ2NsaWVudGFkbWluJyxcbiAgJ21pc3Npb25hbmFseXNpcycsXG4gICdtaXNzaW9udmlld2VyJyxcbiAgJ2ZvbGxvd3VwJyxcbiAgJ2ZvbGxvd3Vwbm91c2VyJyxcbiAgJ3Byb2ZpbGVub2VkaXQnLFxuICAnd29ya3BsYWNlJyxcbiAgJ3RyaWFsJyxcbiAgJ3ZpZGVvY2FsbCcsXG4gICdhY2FkZW15JyxcbiAgJ3BoYXJtYW9uZScsXG4gICdpbnN0YWdyYW0nLFxuICAndGFza3VzZXInLFxuICAndGFza2NyZWF0b3InLFxuICAnYmknLFxuICAnc3RvcmVpbnNpZ2h0cycsXG4gICdoZWFsdGhzY29yZScsXG4gICd2aXNpdCcsXG4gICdpbWFnZXJlY28nLFxuICAncHJvZHVjdGJhdGNoJyxcbiAgJ3Rhc2thc3NpZ24nLFxuICAnc2NhbmRpdCdcbl07XG5cbmV4cG9ydCBjb25zdCBST0xFU19BU0sgPSBbJ21hbmFnZXInLCAnY3JlYXRvcicsICdxdW9yYScsICdhY2FkZW15JywgJ2FjYWRlbXlwbHVzJ107XG5cbmV4cG9ydCBjb25zdCBST0xFU19DT05ESVRJT05TID0ge1xuICBpc0FkbWluOiB7IHR5cGU6ICdyb2xlcycsIG9wZXJhdG9yOiAnaW4nLCBncm91cDogWydhZG1pbiddIH0sXG4gIGlzQ2xpZW50QWRtaW46IHsgdHlwZTogJ3JvbGVzJywgb3BlcmF0b3I6ICdpbicsIGdyb3VwOiBbJ2NsaWVudGFkbWluJ10gfSxcbiAgaXNBZG1pbk9yQ2xpZW50QWRtaW46IHsgdHlwZTogJ3JvbGVzJywgb3BlcmF0b3I6ICdpbicsIGdyb3VwOiBbJ2FkbWluJywgJ2NsaWVudGFkbWluJ10gfSxcbiAgaXNOb3RBZG1pbjogeyB0eXBlOiAncm9sZXMnLCBvcGVyYXRvcjogJ25pbicsIGdyb3VwOiBbJ2FkbWluJ10gfSxcbiAgaXNOZWl0aGVyQWRtaW5Ob3JDbGllbnRBZG1pbjogeyB0eXBlOiAncm9sZXMnLCBvcGVyYXRvcjogJ25pbicsIGdyb3VwOiBbJ2FkbWluJywgJ2NsaWVudGFkbWluJ10gfSxcbiAgaXNNYW5hZ2VyOiB7IHR5cGU6ICdyb2xlcycsIG9wZXJhdG9yOiAnaW4nLCBncm91cDogWydtYW5hZ2VyJ10gfSxcbiAgaXNOb3RNYW5hZ2VyOiB7IHR5cGU6ICdyb2xlcycsIG9wZXJhdG9yOiAnbmluJywgZ3JvdXA6IFsnbWFuYWdlcicsICdhZG1pbiddIH0sXG4gIGlzVGVhbTogeyB0eXBlOiAncm9sZXMnLCBvcGVyYXRvcjogJ2luJywgZ3JvdXA6IFsndGVhbSddIH0sXG4gIGlzV29ya3BsYWNlOiB7IHR5cGU6ICdyb2xlcycsIG9wZXJhdG9yOiAnaW4nLCBncm91cDogWydhZG1pbicsICd3b3JrcGxhY2UnXSB9LFxuICBoYXNUb2RvT3JTY29yZTogeyB0eXBlOiAncm9sZXMnLCBvcGVyYXRvcjogJ2luJywgZ3JvdXA6IFsndG9kbycsICdzY29yZSddIH0sXG4gIGhhc1RvZG86IHsgdHlwZTogJ3JvbGVzJywgb3BlcmF0b3I6ICdpbicsIGdyb3VwOiBbJ3RvZG8nXSB9LFxuICBoYXNTY29yZTogeyB0eXBlOiAncm9sZXMnLCBvcGVyYXRvcjogJ2luJywgZ3JvdXA6IFsnc2NvcmUnXSB9LFxuICBoYXNTZXJ2aWNlOiB7IHR5cGU6ICdyb2xlcycsIG9wZXJhdG9yOiAnaW4nLCBncm91cDogWydhZG1pbicsICdzZXJ2aWNlJ10gfSxcbiAgaGFzUHJvZHVjdEJhdGNoOiB7IHR5cGU6ICdyb2xlcycsIG9wZXJhdG9yOiAnaW4nLCBncm91cDogWydhZG1pbicsICdwcm9kdWN0YmF0Y2gnXSB9LFxuICBoYXNNZW1vQXNzaWduOiB7IHR5cGU6ICdyb2xlcycsIG9wZXJhdG9yOiAnaW4nLCBncm91cDogWydhZG1pbicsICd0YXNrYXNzaWduJ10gfVxufTtcbiJdfQ==