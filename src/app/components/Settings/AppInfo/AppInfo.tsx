import React from "react";
import * as Styles from "./AppInfo.style";

export const AppInfo = () => (
  <Styles.AppInfo>
    <div>{process.env.appName} {process.env.appVersion}</div>
    <div>
      By using {process.env.appName}, you agree to the following <a href="#">Terms and Conditions</a> and <a href="#">Privacy Policy</a>.
    </div>
</Styles.AppInfo>
)
