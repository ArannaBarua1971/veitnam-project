import React, { useState, useEffect } from "react";
import axios from "axios";
import conf from "../../conf/conf";
import MainContainer from "../../container/MainContainer";
import { ContentHeader, Package, Button } from "../adminComponents";
import { useNavigate } from "react-router-dom";

function AllMembeShip() {
  const navigate = useNavigate();
  const [memberships, setMemberships] = useState([]);

  const getMemberships = async () => {
    await axios
      .get(`${conf}/get-membership`)
      .then(function (response) {
        setMemberships(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    try {
      getMemberships();
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div>
      {/* Go to IDP section */}
      <section id="IDP">
        <MainContainer className="mx-auto  col-xl-9 col-sm-11 my-3">
          <div className="d-flex flex-wrap justify-content-between align-items-center mt-3">
            <ContentHeader className="h2 mx-2">Gói dịch vụ IDP</ContentHeader>
            <Button
              className="py-2 mx-2 bg-dark"
              onClick={() => navigate("/admin/add-membership")}
            >
              Add Membership
            </Button>
          </div>

          {/* all IDP */}
          <div className="IDP my-5 d-flex flex-wrap">
            {memberships.map((membership) => (
              <Package
                id={membership.catagory}
                membershipId={membership.id}
                img={`./imgs/${membership.catagory}.svg`}
                details={membership.title}
                months={membership.membershipsmonth}
                active={membership.active_membership_status}
                getMemberships={getMemberships}
              />
            ))}
          </div>
        </MainContainer>
      </section>
    </div>
  );
}

export default AllMembeShip;
