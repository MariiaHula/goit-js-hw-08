import throttle from 'lodash.throttle';

const refs = {
    formUserEl: document.querySelector('.feedback-form'),
    localStorageKey: "feedback-form-state",
}

refs.saveUserEmailEl = refs.formUserEl.children[0].firstElementChild;
refs.saveUserMessageEl = refs.formUserEl.children[1].firstElementChild;

//1 step
const inputData = throttle(saveToLocalStorage, 500);

function saveToLocalStorage () {
    try {
        const key = refs.localStorageKey;
        const userData = {
            email: refs.saveUserEmailEl.value,
            message: refs.saveUserMessageEl.value,
        };
        const serializedState = JSON.stringify(userData);
        localStorage.setItem(key, serializedState);
    } catch (error) {
        console.error("Set state error: ", error.message);
    };
};

refs.saveUserEmailEl.addEventListener('input', inputData);
refs.saveUserMessageEl.addEventListener('input', inputData);

//2step

const savedUserData = getFromLocalStorage();
refs.saveUserEmailEl.value = savedUserData.email;
refs.saveUserMessageEl.value = savedUserData.message;

function getEmptyUserData() {
    return {
        email: '',
        message: '',
    };
};
function getFromLocalStorage() {
    try {
        const serializedState = localStorage.getItem(refs.localStorageKey);
        return serializedState === null ? getEmptyUserData() : JSON.parse(serializedState);
    } catch (error) {
       console.error("Get state error: ", error.message);
       return getEmptyUserData();
    };  
};

//3 step
refs.formUserEl.addEventListener("submit", onDataSubmit);

function onDataSubmit (event) {
    event.preventDefault();
    
    const userData = {
        email: refs.saveUserEmailEl.value,
        message: refs.saveUserMessageEl.value,
    };

    refs.formUserEl.reset();
    localStorage.removeItem(refs.localStorageKey);
    console.log(userData);
};


