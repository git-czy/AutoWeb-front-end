import axios from "axios";


async function get_repos() {
    let res = await axios.get('http://106.55.18.128:8001/v1/user/git/get_repos')
    return res.data.data
}


async function upload_project(projectName, formData) {
    await axios.post(
        "http://127.0.0.1:8000/v1/deploy/upload/project?project_name=" + projectName,
        formData,
        {
            headers: {
                'Content-Type': "multipart/form-data",
            }
        }
    ).then(
        (response) => {
            alert(response.data.msg)
        },
        (error) => {
            alert( error.message)
        }
    );
}

export const GET_REPOS = get_repos
export const UPLOAD_PROJECT = upload_project
