import { Button, Heading, Text } from "@medusajs/ui"
import TranslationComponent from "@modules/Translator/component/translation"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const SignInPrompt = () => {
  return (
    <div className="bg-white flex items-center justify-between">
      <div>
        <Heading level="h2" className="txt-xlarge">
          <TranslationComponent query={"Already have an account?"} />
        </Heading>
        <Text className="txt-medium text-ui-fg-subtle mt-2">
          <TranslationComponent query={"Sign in for a better experience."} />
        </Text>
      </div>
      <div>
        <LocalizedClientLink href="/account">
          <Button variant="secondary" className="h-10">
            <TranslationComponent query={"Sign in"} />
          </Button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default SignInPrompt
