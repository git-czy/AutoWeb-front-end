import axios from "axios";


axios.defaults.withCredentials = true

async function get_repos() {
    let res = await axios.get('http://106.55.18.128:8001/v1/user/git/get_repos')
    return res.data.data
}


async function upload_project(projectName, formData) {
    return await axios.post(
        "http://127.0.0.1:8000/v1/deploy/upload/project?project_name=" + projectName,
        formData,
        {
            headers: {
                'Content-Type': "multipart/form-data",
            }
        }
    ).then(
        (response) => {
            return [true, response.data.msg]
        },
        (error) => {
            return [false, error.message]
        }
    )
}

async function upload_ssl(projectName, formData) {
    return await axios.post(
        "http://127.0.0.1:8000/v1/deploy/upload/ssl?project_name=" + projectName,
        formData,
        {
            headers: {
                'Content-Type': "multipart/form-data",
            }
        }
    ).then(
        (response) => {
            return [true, response.data.msg]
        },
        (error) => {
            return [false, error.message]
        }
    )
}

async function upload_config(data) {
    return await axios.post(
        "http://127.0.0.1:8000/v1/deploy/config",
        data,
        {
            headers: {
                'Content-Type': "application/json",
            }
        }
    ).then(
        (response) => {
            return [true, response.data.msg]
        },
        (error) => {
            return [false, error.message]
        }
    )
}

export const GET_REPOS = get_repos
export const UPLOAD_PROJECT = upload_project
export const UPLOAD_SSL = upload_ssl
export const UPLOAD_CONFIG = upload_config
