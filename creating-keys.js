export default function createKeys(array, divTarget) {
  array.forEach((elem) => {
    const divRow = document.createElement('div');
    divRow.className = 'row';
    divTarget.append(divRow);

    elem.forEach((key) => {
      const divKey = document.createElement('div'); // create key

      divKey.className = 'key';
      divKey.setAttribute('id', key.id);

      if (key.class) {
        // add func class to key
        divKey.classList.add('func');
        divKey.classList.add(key.class);
      }

      divRow.append(divKey); // add key to row
    });
  });
}
