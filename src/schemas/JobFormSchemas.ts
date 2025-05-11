import {z} from 'zod';

export const JobApplicationSchema = z.object({
    position: z.string().min(1, 'Position is required'),
    company: z.string().min(1, 'Company is required'),
    jobBoardUsed: z.string().min(1, 'Job board is required'),
    status: z.enum(['PENDING', 'APPLIED', 'INTERVIEW_SCHEDULED', 'REJECTED']),

    description: z.string().optional(),
    companyLink: z.string().url('Must be a valid URL').optional(),
    postingLink: z.string().url('Must be a valid URL').optional(),

    applicationDate: z.union([z.date(), z.string()]).optional(),
    rejectionDate: z.union([z.date(), z.string()]).optional(),
    interviewDate: z.union([z.date(), z.string()]).optional(),

    hiringManagers: z.array(
        z.object({
            fullName: z.string().min(1, 'Name is required'),
            email: z.string().email('Invalid email'),
            linkedinUrl: z.string().url('Must be a valid Linkedin URL')
        })
    ).optional()

}).superRefine((data, ctx) => {
    if(data.status === 'APPLIED' && !data.applicationDate){
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['applicationDate'],
            message: 'Application date is required when status is set to APPLIED.'
        });
    }

    if(data.status === 'INTERVIEW_SCHEDULED'){
        if(!data.applicationDate){

        }
        
        if(!data.interviewDate){

        }
    }

    if(data.status === 'REJECTED'){
        if(!data.applicationDate){

        }
        
        if(!data.interviewDate){
            
        }

        if(!data.rejectionDate){
            
        }
    }
})