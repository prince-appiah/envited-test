import { Button, Flex, Heading, Image, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

type Props = {};

const bgImage =
  "https://s3.us-west-2.amazonaws.com/secure.notion-static.com/ea95af2d-7f06-4f25-859c-9069519053a7/Landing_page_image.svg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221003%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221003T112921Z&X-Amz-Expires=86400&X-Amz-Signature=63b4f045643f7a6a11edd4bc56d3fec2c8431093afd160c482e226a9cdaa566e&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Landing%2520page%2520image.svg%22&x-id=GetObject";

const LandingPage = (props: Props) => {
  const navigate = useNavigate();

  return (
    <Flex
      direction={{ base: "column-reverse", lg: "row" }}
      justify="space-between"
      bg="#f6f2ff"
      height="100vh"
      overflow="scroll"
      py={{ base: 10, lg: 100 }}
      px={{ base: 20, lg: 170 }}
    >
      {/* Image  */}
      <Image src={bgImage} />
      {/* Text */}
      <Flex
        direction="column"
        align="flex-end"
        width={{ base: "100%", lg: "60%" }}
        alignSelf="center"
        mb={{ base: 24, lg: 0 }}
      >
        <VStack align={{ base: "center", lg: "end" }} mb={12}>
          <Heading textAlign={{ base: "center", lg: "right" }}>
            Imagine if{" "}
            <Text bgGradient="linear(to-r,#8456e6,#e87bf8)" bgClip="text">
              Snapchat
            </Text>{" "}
            has events
          </Heading>
          <Text color="gray">
            Easily host and share events with your friends across any social
            media
          </Text>
        </VStack>
        <Button
          variant="solid"
          size="lg"
          width="xs"
          mx="auto"
          onClick={() => navigate("/create")}
        >
          🎉 Create my event
        </Button>
      </Flex>
    </Flex>
  );
};

export default LandingPage;
