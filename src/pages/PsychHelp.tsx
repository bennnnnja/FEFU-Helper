import { Phone, HeartHandshake } from 'lucide-react'
import PageHeader from '../components/PageHeader'
import Card from '../components/Card'
import { useLang } from '../context/LangContext'
import { contacts } from '../data/contacts'

export default function PsychHelp() {
  const { t } = useLang()
  return (
    <div className="pb-6">
      <PageHeader title={t('psychTitle')} />
      <div className="px-4 space-y-4">
        <Card className="p-6 text-center">
          <div className="h-16 w-16 mx-auto rounded-full bg-brand/10 grid place-items-center text-brand">
            <HeartHandshake size={30} />
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-4 leading-relaxed">
            {t('psychDesc')}
          </p>
        </Card>

        <Card className="p-5 text-center">
          <div className="text-sm text-slate-400">{t('trustLine')}</div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
            {contacts.psychTrustLine.label}
          </div>
          <a
            href={`tel:${contacts.psychTrustLine.tel}`}
            className="mt-4 w-full h-12 rounded-card bg-brand text-white font-semibold flex items-center justify-center gap-2"
          >
            <Phone size={18} /> {t('call')}
          </a>
        </Card>
      </div>
    </div>
  )
}
