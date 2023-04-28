// Скрипт должен для всех контактов без сделок создать новую задачу с текстом “Контакт без сделок”
const limit = 25;
let page = 1;
let getContactsListQueryUrl = '/api/v4/contacts';
let createTaskUrl = '/api/v4/tasks';

function createTask() {
    $.ajax({
        url: createTaskUrl,
        method: 'POST',
        data: {
            text: 'Контакт без сделок',
            complete_till: 1681851683,
        }
    }).done(function (data) {
        if (!!data) {
            console.log('Сделка успешно добавлена')
        }
    })
}


function getContacts() {
    $.ajax({
        url: getContactsListQueryUrl,
        method: 'GET',
        data: {
            limit: limit,
            with: 'leads',
            page: page
        }
    }).done(function (data) {
        if (!!data && !(data._embedded[leads])) {
            createTask();
            console.log(data)

        } else {
            console.log('Контактов нет');
            return false;
        }
    }).fail(function (data) {
        console.log('Что-то пошло не так c получением контактов');
        console.log(data);
        return false;
    })

    page++;
}

getContacts();
