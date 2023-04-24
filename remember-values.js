TB.render('component_ID', function(data) {
    // Helper functions
    const getEle = (selector) => data.ele.find(selector);
    const setLocalStorage = (key, value) => localStorage.setItem(key, value);
    const getLocalStorage = (key) => localStorage.getItem(key);
    
    // Variables 
    const repsInput = getEle('.reps input');
    const weightInput = getEle('.weight input');
    const notesTextarea = getEle('.notes textarea');
    const rememberValuesSwitch = getEle('.switch input');
    const formSubmitButton = getEle('.form-submit button');
    
    // Object of all Storage Keys
    const storageKeys = {
      reps: 'reps-{pageField.Record ID}',
      weight: 'weight-{pageField.Record ID}',
      notes: 'notes-{pageField.Record ID}',
      rememberValues: 'rememberValues-{pageField.Record ID}',
    };
    
    // Object with all LocalStorage Values
    const localValues = {
      reps: getLocalStorage(storageKeys.reps),
      weight: getLocalStorage(storageKeys.weight),
      notes: getLocalStorage(storageKeys.notes),
      rememberValues: getLocalStorage(storageKeys.rememberValues) === 'true',
    };
    
    // Variable for the "Remember values" Switch
    const updateLocalStorage = (key, value) => {
      if (localValues.rememberValues) {
        setLocalStorage(key, value);
      }
    };
    
    // Function for when the "Remember values" Switch changes
    rememberValuesSwitch.change(function () {
      localValues.rememberValues = $(this).is(':checked');
      setLocalStorage(storageKeys.rememberValues, localValues.rememberValues);
      if(localValues.rememberValues){
        setLocalStorage(storageKeys.reps, repsInput.val());
        setLocalStorage(storageKeys.weight, weightInput.val());
        setLocalStorage(storageKeys.notes, notesTextarea.val());
      }
    });
    
    // Update Localstorage on Input Keyups
    repsInput.keyup(function () {
      updateLocalStorage(storageKeys.reps, $(this).val());
    });
    weightInput.keyup(function () {
      updateLocalStorage(storageKeys.weight, $(this).val());
    });
    notesTextarea.keyup(function () {
      updateLocalStorage(storageKeys.notes, $(this).val());
    });
    
    // Update Inputs onload if Remember Values is ON
    if (localValues.rememberValues) {
      repsInput.val(localValues.reps).change();
      weightInput.val(localValues.weight).change();
      notesTextarea.val(localValues.notes).change();
    }
    
    // Set the Switch's Checked Property to the Local Value
    rememberValuesSwitch.prop('checked', localValues.rememberValues);
    
    // Reset values on Form Submit
    formSubmitButton.click(function () {
      if (localValues.rememberValues) {
        setTimeout(function () {
          repsInput.val(getLocalStorage(storageKeys.reps)).change();
          weightInput.val(getLocalStorage(storageKeys.weight)).change();
          notesTextarea.val(getLocalStorage(storageKeys.notes)).change();
        }, 2000);
      }
    });
});