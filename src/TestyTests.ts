

class TestyTest {
  private _Id: string; // Category Id
  private _Category: string;

  private _Elements: ITestElements;

  private _Data: ITestData;


  constructor(category: string)
  {
    // Things to identify the category
    this._Id = Guid();
    this._Category = category;

    // Elements object to easily remember and access HTML elements
    this._Elements = {
      Root: undefined,
      Data: undefined,
      TestsRoot: undefined,
      Tests: {}
    };

    // Setup data to keep track of the state of all tests
    this._Data = {
      Total: 0,
      Pending: 0,
      Passed: 0,
      Failed: 0
    };


    // Create Root Element
    this._Elements.Root = document.createElement('div');
    this._Elements.Root.id = "testy-test-" + this._Id;
    this._Elements.Root.innerHTML = '<h1 class="category-title">' + this._Category + '</h1>' +
                                    '<div id="' + this._Id + '-testy-data">' +
                                      '<span id="' + this._Id + '-total">0</span> total, ' +
                                      '<span id="' + this._Id + '-pending">0</span> pending, ' +
                                      '<span id="' + this._Id + '-passed">0</span> passed, ' +
                                      '<span id="' + this._Id + '-failed">0</span> failed' +
                                    '</div>' +
                                    '<div id="' + this._Id + '-testy-tests">' +
                                    '</div>';

    document.body.appendChild(this._Elements.Root); // Add the root element to the body of the page

    // Remember other html elements
    this._Elements.TestsRoot = document.getElementById(this._Id + '-testy-tests');

    this._Elements.Data = {
      Total: document.getElementById(this._Id + '-total'),
      Pending: document.getElementById(this._Id + '-pending'),
      Passed: document.getElementById(this._Id + '-passed'),
      Failed: document.getElementById(this._Id + '-failed')
    };


    // Add styling to the very botton
    document.body.insertAdjacentHTML('beforeend',
      '<style>' +
        '.category-title { font-size: 35px; margin-bottom: 0px; }' +
        'div[id$="-testy-data"] { font-family: Consolas, monospace; margin-bottom: 15px; }' +
        'div[id$="-testy-tests"] { font-family: Consolas, monospace; padding-left: 20px; }' +
        'div[id$="-test-title"] { display: inline-block; margin-right: 10px; width: 150px; word-wrap: break-word; text-align: right; }' +
        '.test-passed { color: #02B71E; } .test-failed, .test-timedout { color: #FF0000; }' +
        'div[id$="-test-container"] { margin-top: 5px; }' +
        'body { background: #e9e7e7; color: #373a3c }' +
      '</style>'
    );

  } // End constructor



  /**
   * Updates the HTML elements with test results
   */
  private UpdateTest(id: string, result: Boolean, timedOut?: Boolean): void {
    if (timedOut == undefined) timedOut = false;
    if (result == undefined) result = false;

    this._Data.Pending--;

    if (timedOut || !result)
    {
      this._Data.Failed++;
      this._Elements.Data.Failed.innerHTML = this._Data.Failed.toString();
    } else {
      this._Data.Passed++;
      this._Elements.Data.Passed.innerHTML = this._Data.Passed.toString();
    }

    // Update the HTML elements
    this._Elements.Tests[id].innerHTML = (timedOut) ? 'Timed Out' : (result) ? 'Passed' : 'Failed';
    this._Elements.Tests[id].classList.add('test-' + ((timedOut) ? 'timedout' : (result) ? 'passed' : 'failed'));

    this._Elements.Data.Pending.innerHTML = this._Data.Pending.toString();

  }


  /**
   * Handles an error on a test
   */
  private HandleError(id: string, result: any): void {
    this.UpdateTest(id, false);
    this._Elements.Tests[id].innerHTML = result.toString();
  }


  /**
   * Adds a test
   */
  public AddTest(name: string, test: Function, timeout?: number): void {
    if (timeout == undefined) timeout = 120; // 120 second timeout

    this._Data.Total++;
    this._Elements.Data.Total.innerHTML = this._Data.Total.toString();

    this._Data.Pending++;
    this._Elements.Data.Pending.innerHTML = this._Data.Pending.toString();



    let id = Guid(); // Generate a GUID id for the test

    // Create HTML Element for this test
    let el = document.createElement('div');
    el.id = id + '-test-container';
    el.innerHTML = '<div id="' + id + '-test-title">' + name + ':</div> <span id="' + id + '-test-results">Pending</span>';
    this._Elements.TestsRoot.appendChild(el);

    this._Elements.Tests[id] = document.getElementById(id + '-test-results');

    // SetTimeout to expire the test if it takes too long
    let timerId = window.setTimeout(() => {
      this.UpdateTest(id, false, true);
    }, timeout * 1000);

    // Call the test
    window.setTimeout(() => {
      try
      {
        test((result: Boolean) => {
          window.clearTimeout(timerId); // Clear expiration timer

          this.UpdateTest(id, result); // Update test results
        });
      }
      catch (e) {
        this.HandleError(id, e);
      }
    }, 0);

  } // End AddTest

}





function Guid(){
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  return s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4();
}
