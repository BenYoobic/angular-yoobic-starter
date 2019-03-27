export function getChecklistValidator(options) {
    return (checklist) => {
        let validation = true;
        if (options.required === true) {
            if (options.previousTasks) {
                if (options.previousTasks.length > 0) {
                    options.previousTasks.forEach(task => {
                        if (task.validated === null || task.validated === undefined) {
                            validation = false;
                            return validation;
                        }
                    });
                }
            }
        }
        return validation;
    };
}
