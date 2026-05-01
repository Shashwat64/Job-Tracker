import type { Request, Response } from 'express';
export declare const uploadResume: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getResumes: (req: Request, res: Response) => Promise<void>;
export declare const deleteResume: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=resumeController.d.ts.map