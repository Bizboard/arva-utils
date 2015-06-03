/**
 * Created by tom on 03/06/15.
 */

export function limit(min, value, max) {
    return Math.min(Math.max(min, value), max);
}