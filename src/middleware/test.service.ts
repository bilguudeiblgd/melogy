import {Session} from "next-auth";

export class TestService {

    private baseURL: string;
    private session: Session;
    private requestURL: string;

    constructor(baseURL: string, session: Session) {
        this.baseURL = baseURL
        this.session = session;
        this.requestURL = `${this.baseURL}/api`
    }


    getTestsGiven(): null {
        if (!this.session.user.userHandle)
            return null
        console.log(this.session)
        fetch(`${this.requestURL}/user/${this.session.user.userHandle}`, {
            headers: {
                "Authorization": `Bearer ${this.session.accessToken}`
            }
        }).then()
            .catch((e) => {
                console.log(e)
            })
        return null
    }

}
