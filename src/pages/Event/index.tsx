import { CalendarIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  IconButton,
  Image,
  Input,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { ImLocation2, ImPencil } from "react-icons/im";
import Moment from "react-moment";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { eventState } from "../../atoms/eventState";
import { IEvent } from "../../typings";

type Props = {};

const bgImage =
  "https://s3.us-west-2.amazonaws.com/secure.notion-static.com/17d6299f-f287-469c-a403-b8ab9d75aa62/Birthday_cake.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221003%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221003T112925Z&X-Amz-Expires=86400&X-Amz-Signature=31743f8a28a2d820a433d580480e33197f31397e622fab574166387035681f6b&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Birthday%2520cake.png%22&x-id=GetObject";

const EventPage = (props: Props) => {
  const event = useRecoilState(eventState)[0];
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();
  const setEventState = useSetRecoilState(eventState);
  const [startDate, setStartDate] = useState(new Date(event?.startDate));
  const [endDate, setEndDate] = useState(new Date(event?.endDate));
  const [eventData, setEventData] = useState<Omit<IEvent, "id">>({
    host: event?.host ?? "",
    name: event?.name ?? "",
    location: event?.location ?? "",
    photo: "",
  });

  const handleEditEvent = () => {
    setEventState((prev) => ({
      ...prev,
      ...eventData,
      id: nanoid(),
      startDate,
      endDate,
    }));
  };

  const handleInputChange = (ev: { target: { name: any; value: any } }) =>
    setEventData((prev) => ({ ...prev, [ev.target.name]: ev.target.value }));

  useEffect(() => {
    if (!event) {
      navigate("/create");
    }
  }, [event, navigate]);

  return (
    <>
      <Flex
        direction={{ base: "column-reverse", lg: "row" }}
        justify="space-between"
        height="100vh"
        py={{ base: 8, lg: 100 }}
        px={{ base: 0, lg: 170 }}
      >
        {/* Event details */}
        <Flex direction="column" p={{ base: 6, lg: 0 }}>
          <Flex width="sm">
            <IconButton
              size="sm"
              aria-label="Edit"
              onClick={() => setEditing(!editing)}
              icon={<ImPencil />}
            />
          </Flex>
          <Flex direction="column" mb={16}>
            <Heading>{event?.name}</Heading>
            <Text color="gray">
              Hosted by{" "}
              <Box as="span" fontWeight={600} display="inline-flex">
                {event?.host}
              </Box>
            </Text>
          </Flex>

          <VStack spacing={6} direction="column" align="flex-start">
            <EventInfo
              icon={CalendarIcon}
              title={
                <Moment format="d MMMM hh:mm a">{event?.startDate}</Moment>
              }
              body={<Moment format="d MMMM hh:mm a">{event?.endDate}</Moment>}
            />
            <EventInfo
              icon={ImLocation2}
              title="Street name"
              body={event?.location}
            />
          </VStack>
        </Flex>

        {/* Event photo */}
        <Image
          src={bgImage}
          objectFit="cover"
          height={{ base: 600, lg: "auto" }}
        />
      </Flex>

      <Flex
        py={{ base: 8, lg: 16 }}
        px={{ base: 4, lg: 170 }}
        direction="column"
      >
        {editing && (
          <Box as="form" display="flex" flexDirection="column" mt={16}>
            <Heading size="md" mb={5}>
              Update Event
            </Heading>
            <Stack direction={{ base: "column", lg: "row" }} mb={{ base: 8 }}>
              <FormControl label="Event Name" mb={6} isRequired>
                <FormLabel>🎉 What's the event called?</FormLabel>
                <Input
                  name="name"
                  value={event.name}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl label="Location" mb={6} isRequired>
                <FormLabel>🙈 You forgot the location</FormLabel>
                <Input
                  name="location"
                  value={event.location}
                  onChange={handleInputChange}
                />
              </FormControl>
            </Stack>

            <Stack direction={{ base: "column", lg: "row" }} mb={{ base: 8 }}>
              <FormControl label="Start Date" mb={6} isRequired>
                <FormLabel>📅 When is it starting?</FormLabel>

                <DatePicker
                  // selected={event.startDate}
                  onChange={(date: any) => setStartDate(date)}
                  showTimeSelect
                  dateFormat="MMMM d, yyyy hh:mm"
                />
              </FormControl>
              <FormControl label="End Date" mb={6} isRequired>
                <FormLabel>🏁 When does it end?</FormLabel>
                <DatePicker
                  // selected={event.endDate}
                  onChange={(date: any) => setEndDate(date)}
                  showTimeSelect
                  dateFormat="MMMM d, yyyy hh:mm"
                />
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

            <Button onClick={handleEditEvent}>Edit Event</Button>
          </Box>
        )}
      </Flex>
    </>
  );
};

const EventInfo = ({
  title,
  body,
  icon,
}: {
  title: any;
  body: any;
  icon: any;
}) => {
  return (
    <Flex align="center" justify="space-between">
      {/* icon */}
      <Center p={4} bg="gray.50" rounded="lg" mr={4}>
        <Icon as={icon} color="text.primaryPurple" />
      </Center>
      {/* info goes here */}
      <VStack align="flex-start">
        <Text fontWeight={700} color="text.primaryPurple">
          {/* <Moment format="d MMMM hh:mm a">{event?.startDate}</Moment> */}
          {title}
        </Text>
        <Text color="gray">
          {body}
          {/* to */}
          {/* <Moment format="d MMMM hh:mm a">{event?.endDate}</Moment> */}
        </Text>
      </VStack>
      {/* right icon */}
      {/* <ChevronRightIcon w={8} h={8} color="gray" /> */}
    </Flex>
  );
};

export default EventPage;
