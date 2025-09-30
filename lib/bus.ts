var stack: Record<string, ((message: any) => void)[]> = {};

export const dispatch = (event: string, message: any) => {
  if (!stack[event]) stack[event] = [];
  console.log(
    `Dispatching: ${event} to ${stack[event].length} Subscribers`,
    message === undefined ? '' : message
  );
  stack[event].forEach((regfn: (message: any) => void) => {
    regfn(message);
  });
};

export const on = (event: string, fn: (message: any) => void) => {
  if (!stack[event]) stack[event] = [];
  stack[event].push(fn);

  return () => {
    stack[event] = stack[event].filter((regfn: (message: any) => void) => {
      return regfn !== fn;
    });
  };
};