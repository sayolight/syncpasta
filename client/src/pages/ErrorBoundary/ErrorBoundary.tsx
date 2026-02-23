import { isRouteErrorResponse, useNavigate, useRouteError } from "react-router";
import { Block } from "@ui/block";
import { Button, Typography } from "@/shared/ui";

export function ErrorBoundary() {
  const error = useRouteError();
  const navigate = useNavigate();
  if (isRouteErrorResponse(error)) {
    return (
      <Block isCard={true}>
        <Typography>{error.data}</Typography>
        <Button onClick={() => navigate("/")}>go to main</Button>
      </Block>
    );
  }

  // if (isRouteErrorResponse(error)) {
  //   return (
  //     <>
  //       <h1>
  //         {error.status} {error.statusText}
  //       </h1>
  //       <p>{error.data}</p>
  //     </>
  //   );
  // } else if (error instanceof Error) {
  //   return (
  //     <div>
  //       <h1>Error</h1>
  //       <p>{error.message}</p>
  //       <p>The stack trace is:</p>
  //       <pre>{error.stack}</pre>
  //     </div>
  //   );
  // } else {
  //   return <h1>Unknown Error</h1>;
  // }
}
