import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
    .wmd-prompt-background {
        background-color: rgba(0, 0, 0, 0.15);
    }
    .wmd-prompt-dialog {
        padding: 20px;
        width: 400px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        box-shadow: 4px 2px 5px rgba(0, 0, 0, 0.15);
        border-radius: 5px;
        font-family: Roboto;
        p:first-of-type {
            padding-bottom: 20px;
            b {
                font-size: 1.5em;
                font-weight: 300;
            }
        }
        input[type="text"] {
            border: none;
            border-bottom: 1px solid var(--c-lightgrey-text);
            transition: border-bottom-color 0.3s;
            outline: 0;
            padding: 10px;
            margin-bottom: 15px;
            font-size: 16px;
            &:focus {
                border-bottom-color: var(--c-blue-hl);
            }
        }
        input[type="button"] {
            padding: 8px;
            margin-left: 5px;
            border-radius: 5px;
            border: 0;
            outline: 0;
            text-transform: uppercase;
            font-size: 13px;
            cursor: pointer;
            background-color: transparent;
            transition: background-color 0.2s,color 0.2s;
            &:hover {
                background-color: rgba(0, 0, 0, 0.05)
            }
        }
        input[type="file"] {
            position: absolute;
            width: 0;
            height: 0;
            overflow: hidden;
        }
        label.file-input {
            display: block;
            padding: 8px;
            margin: 0 0 15px 30px;
            width: fit-content;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
            background-color: rgba(0, 0, 0, 0.02);
            transition: background-color 0.2s,color 0.2s;
            &:hover {
                background-color: rgba(0, 0, 0, 0.1);
                color: black;
            }
        }
    }
`
