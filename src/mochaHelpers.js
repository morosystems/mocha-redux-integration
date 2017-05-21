export const skipDependentTests = (test) => {
    const siblings = test.parent.tests;
    const index = siblings.indexOf(test);
    siblings.slice(index + 1).forEach((dependant) => {
        dependant.pending = true; // eslint-disable-line no-param-reassign
    });
};

export const executeCommandWithDependentTests = (test, command) => {
    try {
        command();
    } catch (error) {
        skipDependentTests(test);
        throw error;
    }
};
