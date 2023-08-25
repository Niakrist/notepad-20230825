// Сделайте блокнот, в котором можно будет создавать записи.
// Пусть он представляет собой textarea для ввода текста.
// Слева от поля ввода должны размещаться ссылки на сохраненные записи. 
// По нажатию на ссылку запись должна открываться в редакторе для просмотра и редактирования текста.

const notepadAddText = document.querySelector('.notepad__add-text');
const list = document.querySelector('.list');
const delRecords = document.querySelector('.notepad__del-records');

const newTitle = document.querySelector('.notepad__new-title');
const newTextarea = document.querySelector('.notepad__new-textarea')

notepadAddText.addEventListener('click', function () {
  const bd = {
    id: Date.now(),
    title: newTitle.value,
    text: newTextarea.value,
  }

  if (bd.title.length > 0 && bd.text.length > 0) {

    addRecords(bd);
    newTitle.value = '';
    newTextarea.value = '';
    }

  localStorage.setItem(bd.id, JSON.stringify(bd));
})

window.addEventListener('click', function (e) {
  if (e.target.matches('li')) {
    const id = e.target.dataset.id;
    const bd = JSON.parse(this.localStorage.getItem(id));

    newTitle.value = bd.title;
    newTextarea.value = bd.text;
  }
})

delRecords.addEventListener('click', function () {
  localStorage.clear();
  if (list.children.length > 0) list.innerHTML = '';
  newTitle.value = '';
  newTextarea.value = '';
})

if (localStorage.length > 0) {

  for (let i = 0; i < localStorage.length; i++) {
    const bd = JSON.parse(localStorage.getItem(localStorage.key(i)));
    addRecords(bd);
  }
}

function addRecords(bd) {

  const item = document.createElement('li');
  const record = document.createElement('a');
  const delRecord = document.createElement('span');

  record.href = '#';
  record.textContent = bd.title;

  delRecord.textContent = 'Удалить';
  item.dataset.id = bd.id;
  item.classList.add('item-record')

  item.append(record, delRecord);
  list.appendChild(item);

  newTitle.focus();

  record.addEventListener('click', function (e) {
    e.preventDefault();
  })

  delRecord.addEventListener('click', function () {
    item.remove();
    localStorage.removeItem(item.dataset.id)

  })
}