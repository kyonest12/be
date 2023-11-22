import { Mark } from '../database/entities/mark.entity';

export const getIsBlocked = (marks: Mark): boolean => {
    return Boolean(marks.post.author.blocked.length || marks.post.author.blocking.length);
};
