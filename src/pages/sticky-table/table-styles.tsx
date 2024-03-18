import styled from 'styled-components';

export const Styles = styled.div`
    .table {
        margin: 2px;
        border: 1px solid #ddd;
        .tr {
            max-height: 100px;
            :last-child {
                .td {
                    border-bottom: 0;
                }
            }
        }

        .th,
        .td {
            padding: 1px 10px;
            border-bottom: 1px solid #ddd;
            border-right: 1px solid #ddd;
            color: #000;
            background: var(--white);
            overflow: hidden;
            :last-child {
                border-right: 0;
            }
        }

        .td {
            overflow: scroll;
        }

        .th {
            padding: 5px 10px;
            background-color: var(--light-grey);
        }

        &.sticky {
            overflow: scroll;
            .header,
            .footer {
                position: sticky;
                z-index: 1;
                width: fit-content;
            }

            .header {
                top: 0;
                box-shadow: 0px 3px 3px #ccc;
            }

            .footer {
                bottom: 0;
                box-shadow: 0px -3px 3px #ccc;
            }

            .body {
                position: relative;
                z-index: 0;
            }

            [data-sticky-td] {
                position: sticky;
            }

            [data-sticky-last-left-td] {
                box-shadow: 2px 0px 3px #ccc;
            }

            [data-sticky-first-right-td] {
                box-shadow: -2px 0px 3px #ccc;
            }
        }
    }
    .pagination {
        padding: 0.5rem;
    }
`;
