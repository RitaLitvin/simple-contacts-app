class Contacts {
    static data = [];
    add(info) {
        Contacts.data.push(info);
    };
    static edit(id, obj) {
        for (let i = 0; i < Contacts.data.length; i++) {
            if (Contacts.data[i].id == id) Contacts.data[i] = Object.assign(obj);
            }
        }
    static remove(id) {
        let result = 0;
        for (let i = 0; i < Contacts.data.length; i++) {
            if (Contacts.data[i].id == id) {
                result = 1;
                let key = Object.keys(Contacts.data)[i];
                Contacts.data.splice(key, 1);
            }
        }
        if (result == 0) alert ('Can not find this ID :(');
    }
    static get() {
        return Contacts.data;
    }
}
class User {
    constructor(data) {
        this.data = {
            id: data.id,
            name: data.name,
            email: data.email,
            address: data.address,
            phone: data.phone,
        }
    }
    edit(obj) {
        this.data.id = obj.id;
        this.data.name = obj.name;
        this.data.email = obj.email;
        this.data.address = obj.address;
        this.data.phone = obj.phone;
    }
    get() {
        return this.data;
    }
};
class ContactsApps extends Contacts {
    constructor() {
        super()
// внешний вид приложения
        this.wrap = document.createElement('div');
        this.block = document.createElement('div');
        this.title = document.createElement('h1');
        this.subtitle = document.createElement('h2');

        this.blockId = document.createElement('input');
        this.blockName = document.createElement('input');
        this.blockUsername = document.createElement('input');
        this.blockEmail = document.createElement('input');
        this.blockAddress = document.createElement('input');
        this.blockPhone = document.createElement('input');
        this.blockWebsite = document.createElement('input');
        this.blockCompany = document.createElement('input');

        this.buttonAdd = document.createElement('button');
        this.buttonEdit = document.createElement('button');
        this.buttonSave = document.createElement('button');
        this.buttonSearch = document.createElement('button');
        this.buttonRemove = document.createElement('button');
        this.buttonBack = document.createElement('button');
        // this.buttonShow = document.createElement('button');
        this.buttonWrap = document.createElement('div');
        this.app = document.createElement('div');

        this.wrap.append(this.block);
        this.block.prepend(this.title, this.subtitle, this.blockId, this.blockName, this.blockUsername, this.blockEmail, this.blockAddress, this.blockPhone, this.blockWebsite,this.blockCompany, this.buttonWrap);
        this.buttonWrap.prepend(this.buttonSave,this.buttonSearch,this.buttonAdd, this.buttonEdit, this.buttonRemove, this.buttonBack);
        this.app.prepend(this.wrap);

        this.wrap.setAttribute('class', 'wrap');
        this.block.setAttribute('class', 'block');
        this.title.setAttribute('class', 'title');
        this.subtitle.setAttribute('class', 'subtitle');
        this.blockId.setAttribute('disabled', 'disabled');
        this.blockName.setAttribute('placeholder', 'Name');
        this.blockUsername.setAttribute('placeholder', 'Username');
        this.blockEmail.setAttribute('placeholder', 'Email');
        this.blockAddress.setAttribute('placeholder', 'Address');
        this.blockPhone.setAttribute('placeholder', 'Phone');
        this.blockWebsite.setAttribute('placeholder', 'Website');
        this.blockCompany.setAttribute('placeholder', 'Company');

        this.buttonWrap.setAttribute('class', 'wrap-buttons');
        this.buttonSave.setAttribute('class', 'hidden');
        this.buttonSearch.setAttribute('class', 'hidden');
        this.buttonBack.setAttribute('class', 'hidden');

        this.localData = JSON.parse(localStorage.getItem('Contacts data'));
// если хранилище чистое, то берем данные из апи и записаваем в локальное хранилище и в свойство дата
        if (this.localData == null) {
            this.getData().then((result) => {
                this.storage = result;
                for (let i = 0; i < result.length; i++) {
                    this.onAdd(result[i]);
                }
                this.get();
            });
        };

        if (this.localData !== null && this.localData.length !== 0) {
            Contacts.data = this.localData;
            this.blockId.setAttribute('placeholder', `ID: ${+(Contacts.data[Contacts.data.length-1].id) + 1}`);
            this.buttonEdit.removeAttribute('disabled', 'disabled');
            this.buttonRemove.removeAttribute('disabled', 'disabled');
        } else {
            this.buttonEdit.setAttribute('disabled', 'disabled');
            this.buttonRemove.setAttribute('disabled', 'disabled');
            this.blockId.setAttribute('placeholder', `ID: ${1}`);
        }

        // this.buttonShow.setAttribute('disabled', 'disabled');
        this.title.innerHTML = 'Contacts App';
        this.subtitle.innerHTML = 'Enter contact information below';
        this.buttonAdd.innerText = 'Add contact';
        this.buttonEdit.innerText = 'Edit contact';
        this.buttonRemove.innerText = 'Remove contact';
        this.buttonSave.innerText = 'Save contact';
        this.buttonSearch.innerText = 'Search contact';
        this.buttonBack.innerText = 'Back to main page';
        // this.buttonShow.innerText= 'Show all contacts';

        this.createAppContainer();
    }
// создание главного контейнера
    createAppContainer() {
        this.app.setAttribute('class', 'contacts');
        document.body.prepend(this.app);
    };
// добавление контакта в массив
    onAdd(info) {
        super.add(info);
    };
// создание карточки контакта
    get(){
        if (this.localData !== null && this.localData.length > 0) {
            for (let i = 0; i < this.localData.length; i++){
                let card = document.createElement('div');
                let cardWrap = document.createElement('div');
                let listCategory = document.createElement('ul');
                let listValue = document.createElement('ul');
                let cardTitle = document.createElement('h3');

                card.classList.add('card', 'active');
                listCategory.setAttribute('class', 'card__category');
                listValue.setAttribute('class', 'card__value');
                cardTitle.setAttribute('class', 'card__title');
                cardWrap.setAttribute('class', 'card__wrap');

                this.wrap.append(card);
                card.append(cardTitle, cardWrap);
                cardWrap.append(listCategory, listValue);
                for (let [key, value] of Object.entries(this.localData[i])) {
                    if (key == 'name') cardTitle.innerText = value;

                    let listCategoryItem = document.createElement('li');
                    listCategoryItem.innerText = key;
                    listCategoryItem.setAttribute('class', 'card__item');
                    listCategory.append(listCategoryItem);

                    let listValueItem = document.createElement('li');
                    listValueItem.innerText = value;
                    listValueItem.setAttribute('class', 'card__item');
                    listValue.append(listValueItem);

                    if (key == 'address' && typeof value == 'object') {
                        listValueItem.innerText = `${value.city + ', ' + value.street + ', ' + value.suite + ', ' + value.zipcode}`;
                    }
                    if (key == 'company' && typeof value == 'object') listValueItem.innerText = `${value.name + ', ' + value.catchPhrase + ', ' + value.bs}`;
                };
            };
        }  else if ((this.localData == null) || (this.localData !== null && this.localData.length == 0)) {
            for (let i = 0; i < Contacts.data.length; i++){
                    let card = document.createElement('div');
                    let cardWrap = document.createElement('div');
                    let listCategory = document.createElement('ul');
                    let listValue = document.createElement('ul');
                    let cardTitle = document.createElement('h3');

                    card.classList.add('card', 'active');
                    listCategory.setAttribute('class', 'card__category');
                    listValue.setAttribute('class', 'card__value');
                    cardTitle.setAttribute('class', 'card__title');
                    cardWrap.setAttribute('class', 'card__wrap');

                    this.wrap.append(card);
                    card.append(cardTitle, cardWrap);
                    cardWrap.append(listCategory, listValue);
                    for (let [key, value] of Object.entries(Contacts.data[i])) {
                        if (key == 'name') cardTitle.innerText = value;

                        let listCategoryItem = document.createElement('li');
                        listCategoryItem.innerText = key;
                        listCategoryItem.setAttribute('class', 'card__item');
                        listCategory.append(listCategoryItem);

                        let listValueItem = document.createElement('li');
                        listValueItem.innerText = value;
                        listValueItem.setAttribute('class', 'card__item');
                        listValue.append(listValueItem);

                        if (key == 'address' && typeof value == 'object') {
                            listValueItem.innerText = `${value.city + ', ' + value.street + ', ' + value.suite + ', ' + value.zipcode}`;
                        }
                        if (key == 'company' && typeof value == 'object') listValueItem.innerText = `${value.name + ', ' + value.catchPhrase + ', ' + value.bs}`;
                    };
                };
            }
    };
// обновление карточки контакта, если контакт был изменен/удален
    refreshContacts() {
        let cards = document.querySelectorAll('.card');
        if (cards.length > 0) {
            for (let i = 0; i < cards.length; i++) {
            this.wrap.removeChild(cards[i]);
            };
        };
        this.get();
    };
// очистить инпуты
    clearInputs() {
        app.blockId.value = '';
        app.blockName.value = '';
        app.blockUsername.value = '';
        app.blockEmail.value = '';
        app.blockAddress.value = '';
        app.blockPhone.value = '';
        app.blockWebsite.value = '';
        app.blockCompany.value = '';
    };
// восстановить инпуты и кнопки
    restoreButtonsInputs() {
        if (Contacts.data.length == 0) {
            app.buttonEdit.setAttribute('disabled', 'disabled');
            app.buttonRemove.setAttribute('disabled', 'disabled');
            app.blockId.setAttribute('placeholder', `ID: ${1}`);
            // app.buttonShow.setAttribute('disabled', 'disabled');
        } else app.blockId.setAttribute('placeholder', `ID: ${+(Contacts.data[Contacts.data.length-1].id) + 1}`);

        app.blockId.setAttribute('disabled', 'disabled');
        app.blockName.removeAttribute('class', 'hidden');
        app.blockUsername.removeAttribute('class', 'hidden');
        app.blockEmail.removeAttribute('class', 'hidden');
        app.blockAddress.removeAttribute('class', 'hidden');
        app.blockPhone.removeAttribute('class', 'hidden');
        app.blockWebsite.removeAttribute('class', 'hidden');
        app.blockCompany.removeAttribute('class', 'hidden');

        app.buttonEdit.removeAttribute('class', 'hidden');
        app.buttonAdd.removeAttribute('class', 'hidden');
        app.buttonSearch.setAttribute('class', 'hidden');
        app.buttonRemove.removeAttribute('class', 'hidden');
        // app.buttonShow.removeAttribute('class', 'hidden');
        app.buttonBack.setAttribute('class', 'hidden');
        app.buttonSave.setAttribute('class', 'hidden');
    };
// редактировать контакт
    onEdit(id, obj) {
        Contacts.edit(id, obj);
    };
// удалить контакт
    onRemove(id) {
        Contacts.remove(id);
    };
// получить локальное хранилище
    get storage() {
        return console.log(localStorage);
    };
// записать данные в куки и локальное хранилище
    set storage(value) {
        let date = new Date();
        date.setHours(date.getHours() + 240);
        document.cookie = `storageExpiration = 10 days; expires=${date.toUTCString()}`;
        window.localStorage.setItem('Contacts data', JSON.stringify(value));
    };
// поиск куки
    getCookie(name) {
        let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }
// очистить хранилище, если нет куки
    clearStorage() {
        if(this.getCookie('storageExpiration') == undefined) localStorage.clear()
            else return;
    }
// получение данных из фейк апи
    async getData() {
        let response = await fetch('https://jsonplaceholder.typicode.com/users');
        let text = await response.json();

        this.blockId.setAttribute('placeholder', `ID: ${text.length + 1}`);
        this.buttonEdit.removeAttribute('disabled', 'disabled');
        this.buttonRemove.removeAttribute('disabled', 'disabled');

        return text;
    }
};

let app = new ContactsApps();
app.refreshContacts();

// добавление контакта
app.buttonAdd.addEventListener('click', function(){
    let filledData = {};
    if (app.blockName.value !== '' && app.blockUsername.value !== '' && app.blockEmail.value !== '' && app.blockAddress.value !== '' && app.blockPhone.value !== '' && app.blockWebsite.value !== '' && app.blockCompany.value !== '' && Contacts.data.length !== 0) {
        filledData = {id: +(Contacts.data[Contacts.data.length-1].id) + 1, name: app.blockName.value, username: app.blockUsername.value, email: app.blockEmail.value, address: app.blockAddress.value, phone: app.blockPhone.value, website: app.blockWebsite.value, company: app.blockCompany.value};
        app.onAdd(filledData);
        app.storage = Contacts.data;
        app.clearInputs();
        app.blockId.setAttribute('placeholder', `ID: ${+(Contacts.data[Contacts.data.length-1].id) + 1}`);
    } else if (app.blockName.value !== '' && app.blockUsername.value !== '' && app.blockEmail.value !== '' && app.blockAddress.value !== '' && app.blockPhone.value !== '' && app.blockWebsite.value !== '' && app.blockCompany.value !== '' && Contacts.data.length == 0) {
        filledData = {id: Contacts.data.length + 1, name: app.blockName.value, username: app.blockUsername.value, email: app.blockEmail.value, address: app.blockAddress.value, phone: app.blockPhone.value, website: app.blockWebsite.value, company: app.blockCompany.value};
        app.onAdd(filledData);
        app.storage = Contacts.data;
        app.clearInputs();
        app.blockId.setAttribute('placeholder', `ID: ${+(Contacts.data[Contacts.data.length-1].id) + 1}`);
    }
    else alert('Fill in all the fields :)');
    if (Contacts.data.length !== 0) {
    app.buttonEdit.removeAttribute('disabled', 'disabled');
    app.buttonRemove.removeAttribute('disabled', 'disabled');
    // app.buttonShow.removeAttribute('disabled', 'disabled');
    }
    app.refreshContacts();
}
)
// редактирование контакта
app.buttonEdit.addEventListener('click', function() {
    app.blockId.removeAttribute('disabled', 'disabled');
    app.blockName.setAttribute('class', 'hidden');
    app.blockUsername.setAttribute('class', 'hidden');
    app.blockEmail.setAttribute('class', 'hidden');
    app.blockAddress.setAttribute('class', 'hidden');
    app.blockPhone.setAttribute('class', 'hidden');
    app.blockWebsite.setAttribute('class', 'hidden');
    app.blockCompany.setAttribute('class', 'hidden');

    app.buttonEdit.setAttribute('class', 'hidden');
    app.buttonAdd.setAttribute('class', 'hidden');
    app.buttonRemove.setAttribute('class', 'hidden');
    // app.buttonShow.setAttribute('class', 'hidden');
    app.buttonBack.removeAttribute('class', 'hidden');
    app.blockId.placeholder = 'Enter ID of the contact to be edited';
    app.buttonSearch.removeAttribute('class', 'hidden');
})
// поиск контакта
app.buttonSearch.addEventListener('click', function() {
    let result = 0;
    if (app.blockId.value !== '') {
        for (let i = 0; i < Contacts.data.length; i++) {
            if (Contacts.data[i].id == app.blockId.value) {
                result = 1;
                app.blockId.setAttribute('disabled', 'disabled');
                app.blockName.removeAttribute('class', 'hidden');
                app.blockUsername.removeAttribute('class', 'hidden');
                app.blockEmail.removeAttribute('class', 'hidden');
                app.blockAddress.removeAttribute('class', 'hidden');
                app.blockPhone.removeAttribute('class', 'hidden');
                app.blockWebsite.removeAttribute('class', 'hidden');
                app.blockCompany.removeAttribute('class', 'hidden');
                app.blockName.value = Contacts.data[i].name;
                app.blockUsername.value = Contacts.data[i].username;
                app.blockEmail.value = Contacts.data[i].email;

                if (typeof Contacts.data[i].address == 'object') {
                    app.blockAddress.value = `${Contacts.data[i].address.city + ', ' + Contacts.data[i].address.street + ', ' + Contacts.data[i].address.suite + ', ' + Contacts.data[i].address.zipcode}`;
                } else app.blockAddress.value = Contacts.data[i].address;

                app.blockPhone.value = Contacts.data[i].phone;
                app.blockWebsite.value = Contacts.data[i].website;

                if (typeof Contacts.data[i].company == 'object') {
                    app.blockCompany.value = `${Contacts.data[i].company.name + ', ' + Contacts.data[i].company.catchPhrase + ', ' + Contacts.data[i].company.bs}`;
                } else app.blockCompany.value = Contacts.data[i].company;

                app.buttonSave.removeAttribute('class', 'hidden');
                app.buttonEdit.setAttribute('class', 'hidden');
                app.buttonSearch.setAttribute('class', 'hidden');
            }
        }
    }
    if (result == 0) {
        alert ('Can not find this ID :(');
        app.blockId.value = '';
    }
})
// сохранение обновленного контакта
  app.buttonSave.addEventListener('click', function(){
    if(app.blockName.value == '' || app.blockUsername.value == '' || app.blockEmail.value == '' ||  app.blockAddress.value == '' ||  app.blockPhone.value == '' ||  app.blockWebsite.value == '' ||  app.blockCompany.value == '') {
    alert ('Fill in all the fields :)')
    } else {
        app.blockId.setAttribute('disabled', 'disabled');
        let editedData = {id: +app.blockId.value, name: app.blockName.value, username: app.blockUsername.value, email: app.blockEmail.value, address: app.blockAddress.value, phone: app.blockPhone.value, website: app.blockWebsite.value, company: app.blockCompany.value};
        app.onEdit(app.blockId.value, editedData);
        app.storage = Contacts.data;
        app.clearInputs();
        app.buttonSave.setAttribute('class', 'hidden');
        app.buttonEdit.removeAttribute('class', 'hidden');
        app.buttonAdd.removeAttribute('class', 'hidden');
        app.buttonRemove.removeAttribute('class', 'hidden');
        app.buttonBack.setAttribute('class', 'hidden');
        // app.buttonShow.removeAttribute('class', 'hidden');
        app.blockId.setAttribute('placeholder', `ID: ${Contacts.data.length + 1}`);
        app.refreshContacts();
    }
}
)
// удаление контакта
app.buttonRemove.addEventListener('click', function() {
    app.blockId.removeAttribute('disabled', 'disabled');
    app.blockName.setAttribute('class', 'hidden');
    app.blockUsername.setAttribute('class', 'hidden');
    app.blockEmail.setAttribute('class', 'hidden');
    app.blockAddress.setAttribute('class', 'hidden');
    app.blockPhone.setAttribute('class', 'hidden');
    app.blockWebsite.setAttribute('class', 'hidden');
    app.blockCompany.setAttribute('class', 'hidden');

    app.buttonEdit.setAttribute('class', 'hidden');
    app.buttonAdd.setAttribute('class', 'hidden');
    // app.buttonShow.setAttribute('class', 'hidden');
    app.buttonBack.removeAttribute('class', 'hidden');
    app.blockId.placeholder = 'Enter ID of the contact to be deleted';
    if (app.blockId.value !== '') {
        app.onRemove(app.blockId.value);
        app.storage = Contacts.data;
        app.blockId.value = '';
        app.refreshContacts();
    }
    if (Contacts.data.length == 0) {
        app.blockId.setAttribute('placeholder', 'There are no contacts here yet');
        app.buttonRemove.setAttribute('disabled', 'disabled');
    }
})
// возврат на главную страницу
app.buttonBack.addEventListener('click', function() {
    app.restoreButtonsInputs();
    app.clearInputs();
    app.buttonBack.setAttribute('class', 'hidden');
}
)
app.clearStorage();