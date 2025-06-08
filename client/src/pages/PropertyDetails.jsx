import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DatePicker } from "@mui/lab";
import { CircularProgress, Rating, TextField } from "@mui/material";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { getPropertyDetails, BookProperty } from "../api";
import { openSnackbar } from "../redux/reducers/snackbarSlice";
import Button from "../componnents/Button";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 50px;
  padding: 20px;
  height: 95vh;
  margin: 0 20px;
  background: ${({ theme }) => theme.bg};
  border-radius: 12px 12px 0 0;
  overflow-y: scroll;
`;

const Image = styled.img`
  width: 50%;
  border-radius: 6px;
  object-fit: cover;
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
`;

const Desc = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.text_primary};
`;

const Price = styled.div`
  font-size: 20px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
`;

const Span = styled.span`
  font-size: 16px;
  color: ${({ theme }) => theme.text_secondary};
  text-decoration: line-through;
  margin-left: 8px;
`;

const Percent = styled.span`
  font-size: 16px;
  color: green;
  margin-left: 8px;
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const BookingContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const LoadingWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(false);

  const getPropertyDetailsByID = async () => {
    try {
      setLoading(true);
      const response = await getPropertyDetails(id);
      setProperty(response.data);
    } catch (error) {
      dispatch(openSnackbar({ 
        message: error.message || "Failed to fetch property details", 
        severity: "error" 
      }));
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async () => {
    if (!startDate || !endDate) {
      dispatch(openSnackbar({ 
        message: "Please select both start and end dates", 
        severity: "warning" 
      }));
      return;
    }

    try {
      await BookProperty({
        propertyId: id,
        startDate,
        endDate,
      });
      dispatch(openSnackbar({ 
        message: "Property booked successfully!", 
        severity: "success" 
      }));
      navigate("/bookings");
    } catch (error) {
      dispatch(openSnackbar({ 
        message: error.message || "Booking failed", 
        severity: "error" 
      }));
    }
  };

  useEffect(() => {
    if (id) {
      getPropertyDetailsByID();
    }
  }, [id]);

  if (loading) {
    return (
      <LoadingWrapper>
        <CircularProgress />
      </LoadingWrapper>
    );
  }

  if (!property) {
    return (
      <Container>
        <Title>Property not found</Title>
      </Container>
    );
  }

  return (
    <Container>
      <Image src={property.imageUrl} alt={property.title} />
      <Right>
        <Title>{property.title}</Title>
        <Desc>{property.description}</Desc>
        <RatingContainer>
          <Rating 
            value={property.rating} 
            readOnly 
            precision={0.5}
          />
          <span>({property.reviews} reviews)</span>
        </RatingContainer>
        <Price>
          ${property.price}
          {property.discount > 0 && (
            <>
              <Span>${property.originalPrice}</Span>
              <Percent>{property.discount}% OFF</Percent>
            </>
          )}
        </Price>
        <BookingContainer>
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={setStartDate}
            renderInput={(params) => <TextField {...params} fullWidth />}
            minDate={new Date()}
          />
          <DatePicker
            label="End Date"
            value={endDate}
            onChange={setEndDate}
            renderInput={(params) => <TextField {...params} fullWidth />}
            minDate={startDate || new Date()}
          />
          <Button 
            onClick={handleBooking}
            disabled={!startDate || !endDate}
          >
            Book Now
          </Button>
        </BookingContainer>
      </Right>
    </Container>
  );
};

export default PropertyDetails;