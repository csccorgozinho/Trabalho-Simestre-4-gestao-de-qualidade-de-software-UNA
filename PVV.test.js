import PreviewView from './PreviewView'; 

describe('PreviewView', () => {
  it('should generate markup for a preview', () => {

    const previewData = {
      id: '123',
      title: 'Sample Recipe',
      image: 'sample.jpg',
      publisher: 'Sample Publisher',
      key: 'sample-key',
    };


    const view = new PreviewView(previewData);

    const markup = view._generateMarkup();


    expect(markup).toContain('123');
    expect(markup).toContain('Sample Recipe');
    expect(markup).toContain('sample.jpg');
    expect(markup).toContain('Sample Publisher');
    expect(markup).toContain('sample-key');
  });


});
