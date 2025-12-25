// this middleware checks whether the authenticated user
// checks if the user is allowed to access certain routes

import { request } from "express";

// so jus extract the role from the decoded user extracted from the token
//check if it is included in the allowedRoles list

const allowedRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role)
      return res.status(401).json({ message: "Not autorized" });

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }

    next();
  };
};

export default allowedRoles;
