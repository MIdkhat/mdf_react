/* @jsxImportSource @emotion/react */
import { IconButton } from "../components/Buttons"
import { CouncilsIcon, DroneSpotIcon, FindMeIcon } from '../components/Icons'
import { css } from "@emotion/react"

export const InfoContent = () => {
  return (
    <div css={styles.container}>
      <div id="info" className="overlay">
        <a href="#" className="close-button" />
        <div id="overlay-content" css={styles.content}>
          <div  css={styles.row}>
            <div css={styles.left}></div>
            <div css={styles.right}>
              <h1>Victorian Drone Flyers Map</h1>
              <p>
                (
                <a href="https://www.facebook.com/groups/1303898433018286/" css={styles.link}>
                  https://www.facebook.com/groups/1303898433018286
                </a>
                )
              </p>
            </div>
          </div>

          <div  css={styles.row}>
            <div css={styles.left}></div>
            <div css={styles.right}>
              <h2 css={styles.heading}>What is this map</h2>
              <p css={styles.infoText}>
                This Resource Map has been created to be used in conjunction with a CASA approved app/website. CASA
                approved apps/websites will only indicate the restrictions or otherwise of the airspace in which you
                want to fly your RPA, they do not include any land restrictions from which you want to launch and land
                your RPA from, ie Parks Victoria or Council restrictions.
              </p>
              <p css={styles.infoText}>
                This Resource Map only contains information on flying drones according to Council Local Laws and Parks
                Victoria managed land where launching and landing a drone is prohibited, it DOES NOT check airports and
                No Fly Zones as regulated by CASA.
              </p>
              <p css={styles.infoText}>So:</p>
              <ol css={styles.list}>
                <li css={styles.infoText}>
                  check a CASA approved app/website first for any airspace restrictions with{" "}
                  <a href="https://www.casa.gov.au/drones/safety-apps" css={styles.link}>
                    CASA safety apps
                  </a>{" "}
                  (we recommend the website{" "}
                  <a href="https://ok2fly.com.au/" css={styles.link}>
                    ok2fly.com.au
                  </a>{" "}
                  as the most accurate for Australian airspace);
                </li>
                <li css={styles.infoText}>
                  check our Resource Map for any restrictions on the land you wish to launch/land your RPA from.
                </li>
              </ol>
            </div>
          </div>

          <div  css={styles.row}>
            <div css={styles.left}></div>
            <div css={styles.right}>
              <h2 css={styles.heading}>Parks Victoria</h2>
              <p css={styles.infoText}>
                Recreational use of{" "}
                <span css={styles.heading}>Remotely Piloted Aircraft Systems (RPAS) and drones</span> by the general
                public is prohibited from Parks Victoria managed land. The recreational use of RPAS is not permitted
                under Parks Victoria regulations. Penalty infringements apply. Commercial filming on Parks Victoria
                managed land requires a permit, including to use RPAS.
              </p>
              <p css={styles.infoText}>
                Parks Victoria managed land will always be displayed within a set Search Radius.
              </p>
              <p css={styles.infoText}>
                When you first open the Map the default location is set to Melbourne with a 5km radius. If you allow the
                app to access your device location, the map will pan to the location of the device and all Parks
                Victoria managed land will be displayed within a 5km radius of your location.
              </p>
              <p css={styles.infoText}>
                To explore any area just click on the map, or broaden the radius from 5km to either 10km, 20km or 50km
                using the distance button on the right.
              </p>
            </div>
          </div>
          <div  css={styles.row}>
            <div css={styles.left}>
            <IconButton
              label={'5 km'}
              css={css`
                z-index: 3;
              `}
              onClick={() => {}}
            />
            </div>
            <div css={styles.right}>
              <h2 css={styles.heading}>Search Radius</h2>
              <p css={styles.infoText}>
                Search Radius for Parks Victoria managed land can be set to 5km, 10km, and 20km. The bigger the radius
                the slower the load time, especially in areas with weak reception.
              </p>
            </div>
          </div>

          <div  css={styles.row}>
            <div css={styles.left}>
            <IconButton icon={<CouncilsIcon size={40} color="#000" />} sticky={true} onClick={() => {}} />
            </div>
            <div css={styles.right}>
              <h2 css={styles.heading}>Councils</h2>
              <p css={styles.infoText}>
                This button loads Council Regions onto the map. Initial load may take some time, especially in areas
                with weak reception.
              </p>
              <p css={styles.infoText}>Councils are colour coded:</p>
              <ul css={styles.list}>
                <li css={styles.infoText}>
                  <span css={{ color: "red" }}>Red</span>: Council does not allow the launching of drones from their
                  land
                </li>
                <li css={styles.infoText}>
                  <span css={{ color: "green" }}>Green</span>: Council does allow the launching of drones from their
                  land
                </li>
                <li css={styles.infoText}>
                  <span css={{ color: "yellow" }}>Yellow</span>: Local law restrictions or requirements apply. If you
                  click in the area on the map a Council Information Window will open which provides information on, or
                  links to, the local law requirements.
                </li>
              </ul>
              <p css={styles.infoText}>
                Click Council for more information and links to documents. While we endeavour to keep this information
                up to date, local laws can change without our knowledge. If you find anything out of date or become
                aware of updates, please email{" "}
                <a href="mailto:MelbDroneFlyersMap@gmail.com?Subject=VDF%20Map" target="_top" css={styles.link}>
                  MelbDroneFlyersMap@gmail.com
                </a>
              </p>
            </div>
          </div>

          <div  css={styles.row}>
            <div css={styles.left}>
              {/* <button
                type="button"
                title="Show Water Reservoirs"
                css={{ ...styles.button, backgroundImage: "url(../images/water-button.png)" }}
              /> */}
            </div>
            <div css={styles.right}>
              <h2 css={styles.heading}>Water Reservoirs</h2>
              <p css={styles.infoText}>Water Reservoirs of Victoria. Not a complete list.</p>
            </div>
          </div>

          <div  css={styles.row}>
            <div css={styles.left}>
            <IconButton icon={<DroneSpotIcon size={40} color="#000" />} sticky={true} onClick={() => {}} />
            </div>
            <div css={styles.right}>
              <h2 css={styles.heading}>Flying Spots</h2>
              <p css={styles.infoText}>
                Where you see a drone icon on the map, these are flying spots which VDF Members have recommended. Click
                on the spot to get more information.
              </p>
            </div>
          </div>

          <div  css={styles.row}>
            <div css={styles.left}>
            <IconButton icon={<FindMeIcon size={40} color="#000" />} onClick={() => {}} />
            </div>
            <div css={styles.right}>
              <h2 css={styles.heading}>Find My Location</h2>
              <p css={styles.infoText}>This button will return the map to the device location.</p>
            </div>
          </div>

          <div  css={styles.row}>
            <div css={styles.left}>
              {/* <button
                type="button"
                title="Add Spot"
                css={{ ...styles.button, backgroundImage: "url(../images/spot-edit-button.png)" }}
              /> */}
            </div>
            <div css={styles.right}>
              <h2 css={styles.heading}>Add Spot</h2>
              <p css={styles.infoText}>
                <span css={{ color: "red" }}>IMPORTANT: </span>You must ensure that the new spot is not set inside Parks
                Victoria managed land or a Council which prohibits flying drones from their land, as these will not be
                approved.
              </p>
              <p css={styles.infoText}>
                <span css={{ color: "red" }}>IMPORTANT: </span>Please, enter a valid email address so admins can contact
                you. Your email will be used solely for communication regarding the New Flying Spot.
              </p>
              <p css={styles.infoText}>
                Click this button to add a new spot. This message will appear: "Alert: You are in ADD SPOT mode. Click
                on the map to add a Spot."
              </p>
              <p css={styles.infoText}>While in "Add Spot" mode click on the map to set a new spot.</p>
              <p css={styles.infoText}>Editing window will appear. Please add title, description, images, videos</p>
              <ul css={styles.list}>
                <li css={styles.infoText}>
                  Title and description. Please provide the proper name of the spot! In the description, provide some
                  details on why the spot is great, what times are best, access information, etc.
                </li>
                <li css={styles.infoText}>
                  Images. This service only accepts external links, no uploading is allowed. Please adjust the image to
                  fit the window by either setting width to 300, or drag one of the image corners to fit the window
                  width after the image is added.
                </li>
                <li css={styles.infoText}>Videos. Videos can be inserted as links.</li>
              </ul>
              <p css={styles.infoText}>
                Save the new spot and it will appear on the map with a question mark. This means it is awaiting Admin
                approval and will not be seen by members until it has been approved.
              </p>
              <p css={styles.infoText}>
                While the page hasn't been refreshed, this new spot can be edited, moved, or deleted.
              </p>
            </div>
          </div>

          <div  css={styles.row}>
            <div css={styles.left}>
              {/* <button
                type="button"
                id="move-nojs"
                css={{ ...styles.button, backgroundImage: "url(../images/move-icon.png)" }}
              /> */}
            </div>
            <div css={styles.right}>
              <h2 css={styles.heading}>Move Spot</h2>
              <p css={styles.infoText}>
                Click Move button, it will turn blue. Now the spot can be dragged to the new location (please note, the
                info window will stay in place, only the marker is moved while in this mode).
              </p>
              <p css={styles.infoText}>
                Once the spot is in the correct location, click Move button in the info window again, the spot will be
                saved in the new location and the button will turn grey.
              </p>
            </div>
          </div>
          <div  css={styles.row}>
            <div css={styles.left}>
              {/* <button
                type="button"
                className="icon"
                css={{ ...styles.iconButton, backgroundImage: "url(../images/edit-icon.png)" }}
              /> */}
            </div>
            <div css={styles.right}>
              <h2 css={styles.heading}>Edit Spot</h2>
              <p css={styles.infoText}>Click to Edit the spot, press Save when done editing</p>
            </div>
          </div>
          <div  css={styles.row}>
            <div css={styles.left}>
              {/* <button
                type="button"
                className="icon"
                css={{ ...styles.iconButton, backgroundImage: "url(../images/delete-icon.png)" }}
              /> */}
            </div>
            <div css={styles.right}>
              <h2 css={styles.heading}>Delete Spot</h2>
              <p css={styles.infoText}>Click to Delete the spot. The Alert will appear, confirm to delete.</p>
            </div>
          </div>
        </div>
        <div id="copyright-info" css={styles.copyright}>
          <p>Copyright © Victorian Drone Flyers Admin Group, 2019 - {new Date().getFullYear()}</p>
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: css`
    font-family: "Roboto";
  `,
  row: css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-bottom: 1px solid gray;
  `,
  column: css`
    float: left;
    padding: 10px;
    min-height: 100px;
  `,
  left: css`
    width: 100px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  right: css`
    width: calc(100% - 100px);
    box-sizing: border-box;
  `,
  iconButton: css`
    background-size: cover;
    background-color: white;
    background-repeat: no-repeat;
    border: 1px solid gray;
    margin-left: 5px;
    width: 20px;
    height: 20px;
  `,
  button: css`
    background-size: 80px 40px;
    background-color: white;
    width: 40px;
    height: 40px;
    float: left;
    opacity: 0.95;
    font-size: 12px;
    font-weight: 700;
    color: #3399cc;
    border: 1px solid black;
    cursor: pointer;
    margin-top: 5px;
    padding: 5px;
    border-radius: 3px;
    -webkit-appearance: none;
  `,
  content: css`
    padding: 10px;
  `,
  heading: css`
    font-weight: 600;
  `,
  infoText: css`
    font-size: 14px;
  `,
  link: css`
    color: #3399cc;
  `,
  redText: css`
    color: red;
  `,
  list: css`
    padding-left: 20px;
  `,
  copyright: css`
    padding: 10px;
    text-align: center;
    font-size: 14px;
  `,
}
