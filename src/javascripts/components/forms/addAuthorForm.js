import selectAuthor from './selectAuthor';

const addAuthorForm = () => {
  document.querySelector('#store').innerHTML = '';
  document.querySelector('#add-button').innerHTML = '';
  document.querySelector('#form-container').innerHTML = `
    <form id="submit-author-form" class="mb-4">
      <div class="form-group">
        <label for="firstName">Author First Name</label>
        <input type="text" class="form-control" id="firstName" placeholder="First Name" required>
      </div>
      <div class="form-group">
        <label for="lastName">Author Last Name</label>
        <input type="text" class="form-control" id="lastName" placeholder="Last Name" required>
      </div>
      <div class="form-check">
      <input type="checkbox" class="form-check-input" id="favorite">
      <label class="form-check-label" for="favorite">Favorite?</label>
    </div>
      <button type="submit" id="submit-author" class="btn btn-primary">Submit Author</button>
    </form>`;

  selectAuthor();
};

export default addAuthorForm;
