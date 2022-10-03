import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  Stack,
} from "@chakra-ui/react";
import { nanoid } from "nanoid";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { ImArrowLeft2 } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { eventState } from "../../atoms/eventState";
import { IEvent } from "../../typings";

type Props = {};

const CreateEventPage = (props: Props) => {
  const navigate = useNavigate();
  const setEventState = useSetRecoilState(eventState);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [eventData, setEventData] = useState<Omit<IEvent, "id">>({
    host: "",
    name: "",
    location: "",
    photo: "",
  });

  const isInvalid =
    !eventData.host ||
    !eventData.name ||
    !eventData.location ||
    !eventData.photo ||
    !startDate ||
    !endDate;

  const handleInputChange = (ev: { target: { name: any; value: any } }) =>
    setEventData((prev) => ({ ...prev, [ev.target.name]: ev.target.value }));

  const handleCreateEvent = () => {
    console.log(eventData);
    setEventState((prev) => ({
      ...prev,
      ...eventData,
      id: nanoid(),
      startDate,
      endDate,
    }));
    navigate("/event");
  };

  return (
    <Flex
      direction="column"
      bg="#f6f2ff"
      height="100vh"
      py={{ base: 6, lg: 100 }}
      px={{ base: 4, lg: 170 }}
    >
      <Flex align="center">
        <IconButton
          onClick={() => navigate(-1)}
          aria-label="Back"
          icon={<ImArrowLeft2 />}
          mr={6}
        />
        <Heading size="lg">Create Event</Heading>
      </Flex>

      <Box as="form" display="flex" flexDirection="column" mt={16}>
        <Stack direction={{ base: "column", lg: "row" }} mb={{ base: 8 }}>
          <FormControl label="Event Name" mb={6} isRequired>
            <FormLabel>🎉 What's the event called?</FormLabel>
            <Input
              name="name"
              value={eventData.name}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl label="Location" mb={6} isRequired>
            <FormLabel>🙈 You forgot the location</FormLabel>
            <Input
              name="location"
              value={eventData.location}
              onChange={handleInputChange}
            />
          </FormControl>
        </Stack>

        <Stack direction={{ base: "column", lg: "row" }} mb={{ base: 8 }}>
          <FormControl label="Start Date" mb={6} isRequired>
            <FormLabel>📅 When is it starting?</FormLabel>

            {/* <Input
            name="startDate"
            value={eventData.startDate}
            onChange={handleInputChange}
          /> */}
            <DatePicker
              selected={startDate}
              onChange={(date: any) => setStartDate(date)}
              showTimeSelect
              dateFormat="MMMM d, yyyy hh:mm"
            />
          </FormControl>
          <FormControl label="End Date" mb={6} isRequired>
            <FormLabel>🏁 When does it end?</FormLabel>
            <DatePicker
              selected={endDate}
              onChange={(date: any) => setEndDate(date)}
              showTimeSelect
              dateFormat="MMMM d, yyyy hh:mm"
            />
            {/* <Input
            name="endDate"
            value={eventData.endDate}
            onChange={handleInputChange}
          /> */}
          </FormControl>
        </Stack>

        <Flex>
          <FormControl label="Event Host" mb={6} isRequired>
            <FormLabel>🤔 Who's the host anyway?</FormLabel>
            <Input
              name="host"
              value={eventData.host}
              onChange={handleInputChange}
            />
          </FormControl>
        </Flex>

        <Button onClick={handleCreateEvent} disabled={isInvalid}>
          Next
        </Button>
      </Box>
    </Flex>
  );
};

// const DatePickerInput = forwardRef(({value,onClick},ref) => (
//     <Input
//             name="endDate"
//             value={value}
//         onChange={onClick}
//         ref={ref}
//           />
// ))

export default CreateEventPage;
