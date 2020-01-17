import "@testing-library/jest-dom/extend-expect";

// document.createRange is used for Autocomplete tests.
(global as any).window.document.createRange = function createRange() {
  return {
    setEnd: () => {},
    setStart: () => {},
    getBoundingClientRect: () => {
      return { right: 0 };
    },
    getClientRects: () => [],
    commonAncestorContainer: document.createElement("div"),
  };
};

class MockResizeObserver {
  observe = (): void => {};
  disconnect = (): void => {};
}
(window as any).ResizeObserver = MockResizeObserver;

(global as any).URL.createObjectURL = jest.fn();
