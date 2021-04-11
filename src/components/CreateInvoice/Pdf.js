import { PDFDownloadLink, Document, Page } from '@react-pdf/renderer'

const MyDoc = () => (
  <Document>
    <Page>
      // My document data
    </Page>
  </Document>
)

const App = () => (
  <div>
    <PDFDownloadLink document={<MyDoc />} fileName="somename.pdf">
      {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'Download now!')}
    </PDFDownloadLink>
  </div>
)

export default MyDoc;