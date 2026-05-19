import { Request, Response, NextFunction } from 'express';

// กำหนด Type ของ Role เพื่อความปลอดภัย (Type Safety)
export type UserRole = 'MANAGER' | 'TEAMLEADER' | 'FLOORSTAFF';

export const authorize = (allowedRoles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.headers['x-user-role'] as UserRole;

    if (!userRole) {
      return res.status(401).json({ 
        message: "Unauthorized: Please provide a user role in headers." 
      });
    }

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ 
        message: `Forbidden: ${userRole} does not have permission to perform this action.` 
      });
    }
    next();
  };
};