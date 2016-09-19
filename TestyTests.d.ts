interface ITestElements {
  Root: HTMLElement;
  Data: ITestDataElement;
  TestsRoot: HTMLElement;
  Tests: any;
}

interface ITestDataElement {
  Total: HTMLElement;
  Pending: HTMLElement;
  Passed: HTMLElement;
  Failed: HTMLElement;
}


interface ITestInfo {
  Result: HTMLElement;
  Title: HTMLElement;
}


interface ITestData {
  Total: number;
  Pending: number;
  Passed: number;
  Failed: number;
}
