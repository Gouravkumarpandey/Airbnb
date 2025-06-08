import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PropertyCard from "../componnents/Cards/PropertyCard";
import { getAllProperties } from "../api";
import { CircularProgress } from "@mui/material";
import { useLocation } from "react-router-dom";

const Container = styled.div`
  padding: 20px 0;
  height: 95vh;
  overflow-y: hidden;
  display: flex;
  align-items: center;
  gap: 30px;
  @media (max-width: 768px) {
    padding: 20px 12px;
    flex-direction: column;
    overflow-y: scroll;
  }
  background: ${({ theme }) => theme.bg};
  margin: 0 20px;
  border-radius: 12px 12px 0 0;
`;

const Property = styled.div`
  padding: 12px;
  overflow: hidden;
  height: fit-content;
  @media (min-width: 768px) {
    width: 100%;
    overflow-y: scroll;
    height: 100%;
  }
`;

const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: center;
  @media (max-width: 750px) {
    gap: 14px;
  }
`;

const PropertyListing = () => {
  const [loading, setLoading] = useState(false);
  const [properties, setProperties] = useState([]);
  const location = useLocation();
  const { location: loc, checkInDate, checkOutDate } = location.state || {};
  const filter = `location=${loc}`;

  const getProperties = async () => {
    try {
      setLoading(true);
      const res = await getAllProperties();
      setProperties(res.data);
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProperties();
  }, []);

  return (
    <Container>
      {loading ? (
        <CircularProgress />
      ) : (
        <Property>
          <CardWrapper>
            {properties.map((property) => (
              <PropertyCard 
                key={property._id} 
                property={property} 
              />
            ))}
          </CardWrapper>
        </Property>
      )}
    </Container>
  );
};

export default PropertyListing;