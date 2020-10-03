import React, { Fragment, useState } from 'react'
import { Drawer } from '../../../components'
import AllocateSettings from '../AllocateSettings'

const PagePermissionItem = ({ name }) => {

    const [showDrawer, setShowDrawer] = useState(false)

    const handleToggleDrawer = () => setShowDrawer(prev => !prev)


    return (
        <Fragment>
            <tr>
                {/* <td>

                </td> */}
                <td>
                    <h5 class="text-truncate font-size-14">
                        <a class="text-dark" href="/projects-list">{name}</a>
                    </h5>
                    <p class="text-muted mb-0">It will be as simple as Occidental</p>
                </td>
                {/* <td>15 Oct, 19</td>
                                    <td>
                                        <span class="badge badge-primary">Completed</span>
                                    </td>
                                    <td>
                                        <div class="team">
                                            <a class="team-member d-inline-block" id="member1" href="/projects-list">
                                                <img src="/static/media/avatar-2.02aea0c2.jpg" class="rounded-circle avatar-xs m-1" alt="" />
                                            </a>
                                            <a class="team-member d-inline-block" id="member2" href="/projects-list">
                                                <img src="/static/media/avatar-1.67e2b9d7.jpg" class="rounded-circle avatar-xs m-1" alt="" />
                                            </a>
                                        </div>
                                    </td> */}
                <td>
                    <div class="dropdown">
                        <button onClick={handleToggleDrawer} aria-haspopup="true" class="card-drop btn" aria-expanded="false">
                            <i class="mdi mdi-account-cog-outline font-size-18"></i>
                        </button>

                    </div>
                </td>
            </tr>

            <Drawer isvisible={showDrawer} toggle={handleToggleDrawer} width="40%">
                {/* <AllocateSettings /> */}
                <AllocateSettings />
            </Drawer>

        </Fragment>
    )
}

export default PagePermissionItem
