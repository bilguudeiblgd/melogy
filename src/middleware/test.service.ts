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


    async getTestsGiven(): Promise<any> {
        if (!this.session.user.userHandle)
            return null
        console.log(this.session)
        fetch(`${this.requestURL}/user/${this.session.user.userHandle}/get-tests-given`, {
            headers: {
                "Authorization": `Bearer ${this.session.accessToken}`
            }
        }).then(async (value) => {
            return await value.json()
        }).catch((e) => {
            console.log(e)
        })
        return null
    }

}
