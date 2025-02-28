/*
 *   Copyright (c) 2024 LoginID Inc
 *   All rights reserved.

 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at

 *   http://www.apache.org/licenses/LICENSE-2.0

 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */

const dateTimeFormat = new Intl.DateTimeFormat("en", {
    month: "numeric",
    year: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
});

const dateFormat = new Intl.DateTimeFormat("en", {
    month: "numeric",
    year: "numeric",
    day: "numeric",
});


export default class ParseUtil {

    static parseDateTime(time: string): string {
        return dateTimeFormat.format(Date.parse(time));
    }

    static parseDateTimeUnix(time: number): string {
        return dateTimeFormat.format(new Date(time * 1000));
    }


    static parseDateUnix(time: number): string {
        return dateFormat.format(new Date(time * 1000));
    }

    static parseDate(time: Date): string {
        return dateFormat.format(time);
    }


}