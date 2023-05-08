var loader = document.getElementById('fullscreen-loader');
function startLoader() {
    loader.classList.add('show');
}

function stopLoader() {
    loader.classList.remove('show');
}

var submitRuleConfirmationId = 'form-submitted';
var componentId = 'component_4';

var formFinished = false;
function checkIfFormFinishedSubmitting() {
    startLoader();
    if(formFinished === false) {
        if ($('#'+submitRuleConfirmationId).length) {
            formFinished = true;
        }
       window.setTimeout(checkIfFormFinishedSubmitting, 100);
    } else {
        stopLoader();
        formFinished = false;
    }
}
TB.render(componentId,function(data){
    data.ele.find('.af-form-submit:not(.ng-hide)').click(function(){
        checkIfFormFinishedSubmitting();
    });
});