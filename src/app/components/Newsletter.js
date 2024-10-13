import React from "react";
import Image from "next/image";

const Newsletter = () => (
  <div className="newsletter">
    <form action="/send-data-here" method="post" className="email-signup">
      <span>Join our Newsletter</span>
      <input type="text" id="first" name="first" placeholder="First name" />
      <input type="text" id="last" name="last" placeholder="Last name" />
      <input type="email" id="email" name="email" placeholder="Email address" />
      <button type="submit">Submit</button>
    </form>
  </div>
);

export default Newsletter;
