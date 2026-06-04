import { useCallback, useEffect, useState } from "react"
import { SectionList, StyleSheet, View } from "react-native"

import Typography from "#design/elements/Typegraphy"

type Section = {
  id: string
  label: string
  data: Item[]
}

type Item = {
  id: string
  label: string
}

const App: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [sections, setSections] = useState<Section[]>([])

  console.log("loading", loading)

  const refresh = useCallback(async () => {
    console.log("refresh")
    setLoading(true)
    await delay(1000)

    setSections(Array.from({ length: 5 }).map((_, index) => makeSection(index)))

    setLoading(false)
  }, [])

  const more = useCallback(async () => {
    console.log("more")
    setLoading(true)
    await delay(1000)

    setSections((sections) =>
      sections.concat(
        Array.from({ length: 5 }).map((_, index) =>
          makeSection(sections.length + index),
        ),
      ),
    )

    setLoading(false)
  }, [])

  useEffect(() => {
    void refresh()
  }, [refresh])

  return (
    <>
      <View style={styles.container}>
        <SectionList
          stickySectionHeadersEnabled
          style={{ width: "100%" }}
          sections={sections}
          refreshing={loading}
          onRefresh={refresh}
          onEndReached={more}
          onEndReachedThreshold={0.5}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={{ paddingVertical: 16, paddingHorizontal: 16 }}>
              <Typography variant="large">{item.label}</Typography>
            </View>
          )}
          renderSectionHeader={({ section }) => (
            <View
              style={{
                paddingVertical: 16,
                paddingHorizontal: 16,
                backgroundColor: "white",
              }}
            >
              <Typography variant="title">{section.label}</Typography>
            </View>
          )}
        />
      </View>
    </>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
})

async function delay(ms: number) {
  await new Promise((resolve) => setTimeout(resolve, ms))
}

function makeSection(index: number): Section {
  return {
    id: `id-${index}`,
    label: `Section ${index + 1}: ${Math.random().toString(16).slice(2, 8)}`,
    data: Array.from({ length: 5 }).map((_, index) => makeItem(index)),
  }
}

function makeItem(index: number): Item {
  return {
    id: `id-${index}`,
    label: `Item ${index + 1}: ${Math.random().toString(16).slice(2, 8)}`,
  }
}
