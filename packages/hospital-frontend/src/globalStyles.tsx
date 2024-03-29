import { css, Global } from "@emotion/react";
import React from "react";

// const GlobalStyles = styled(Global)`
//   *,
//   *::after,
//   *::before {
//     margin: 0;
//     padding: 0;
//     box-sizing: inherit;
//     font-weight: normal;
//   }
//
//   html {
//     font-size: 62.5%;
//     font-family: Arial, sans-serif;
//   }
//
//   body {
//     box-sizing: border-box;
//   }
//
//   /*
//   viewport height
//   */
//   html body #root .App {
//     min-height: 100vh;
//   }
// `;

export const GlobalStyles = () => {
  return (
    <Global
      styles={css`
        *,
        *::after,
        *::before {
          margin: 0;
          padding: 0;
          box-sizing: inherit;
          font-weight: normal;
        }

        html {
          font-size: 62.5%;
          font-family: Arial, sans-serif;
        }

        body {
          box-sizing: border-box;
        }

        /*
      viewport height
      */

        html body #root .App {
          min-height: 100vh;
        }
      `}
    />
  );
};
