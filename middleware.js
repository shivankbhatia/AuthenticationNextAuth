export { default } from "next-auth/middleware";

// will not be accessible when logged out....
export const config = { matcher: ['/dashboard'] };