import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { TypographyH2, TypographyLarge } from "@/components/ui/typography"

export function App() {
	return (
		<Card>
			<CardHeader>
				<TypographyH2>
					📱 The Domia App — One Interface, Infinite Minds
				</TypographyH2>
			</CardHeader>
			<CardContent className="flex flex-col gap-8">
				<TypographyLarge>
					You don’t need an app to use Domia. But when you open it — something
					magical happens. The Domia App (available on web and mobile) gives you
					a real-time window into your entire ecosystem. You can visualize what
					each Domia is feeling, customize their roles and personalities, and
					observe how they evolve over time. But it’s more than a control panel.
					Through the app, you can **talk to your Domia** — by text or voice —
					as if you were speaking to someone who’s still at home, watching over
					things, waiting for your return. It’s a way to stay emotionally
					connected, even when you’re physically apart. Whether you’re managing
					modules or just asking how their day’s been, the Domia App brings your
					digital companions closer — without compromising their autonomy.
				</TypographyLarge>
			</CardContent>
		</Card>
	)
}
