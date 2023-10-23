import AddRecipeView from './AddRecipeView'; 

describe('AddRecipeView', () => {
  let view;

  beforeEach(() => {

    view = AddRecipeView;
    document.body.innerHTML = '<div class="upload"></div>';
  });

  it('should toggle the window', () => {
    view.toggleWindow();
    expect(view._overlay.classList.contains('hidden')).toBe(false);
    expect(view._window.classList.contains('hidden')).toBe(false);

    view.toggleWindow();
    expect(view._overlay.classList.contains('hidden')).toBe(true);
    expect(view._window.classList.contains('hidden')).toBe(true);
  });

  it('should add an upload handler', () => {
    const handler = jest.fn();
    view.addHandlerUpload(handler);

    const form = document.querySelector('.upload');
    form.dispatchEvent(new Event('submit'));

    expect(handler).toHaveBeenCalled();
  });



  afterEach(() => {

    document.body.innerHTML = '';
  });
});