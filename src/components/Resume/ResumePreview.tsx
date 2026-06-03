'use client';

import { useResumeStore } from '@/store/resumeStore';
import { Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';

const levelLabels: Record<string, string> = {
  beginner: '入门',
  intermediate: '熟练',
  advanced: '精通',
  expert: '专家',
};

const degreeLabels: Record<string, string> = {
  high: '高中',
  associate: '专科',
  bachelor: '本科',
  master: '硕士',
  phd: '博士',
};

const proficiencyLabels: Record<string, string> = {
  basic: '基础',
  conversational: '会话',
  fluent: '流利',
  native: '母语',
};

export default function ResumePreview() {
  const { resumeData, themeConfig } = useResumeStore();
  const { personalInfo, education, experience, projects, skills, awards, certifications, languages } = resumeData;

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  return (
    <div className="resume-preview w-full flex flex-col items-start" style={{ fontFamily: themeConfig.fontFamily }}>
      <style>{`
        .resume-preview {
          --primary-color: ${themeConfig.primaryColor};
          --secondary-color: ${themeConfig.secondaryColor};
          --accent-color: ${themeConfig.accentColor};
          align-self: flex-start;
          justify-self: flex-start;
        }
      `}</style>

      {/* Header */}
      <header className="resume-header">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-start gap-4">
            {personalInfo.avatar && (
              <img
                src={personalInfo.avatar}
                alt="头像"
                className="w-20 h-20 rounded-full object-cover border-2"
                style={{ borderColor: themeConfig.primaryColor }}
              />
            )}
            <div>
              <h1 className="text-2xl font-bold" style={{ color: themeConfig.primaryColor }}>
                {personalInfo.name}
              </h1>
              <h2 className="text-lg" style={{ color: themeConfig.secondaryColor }}>
                {personalInfo.title}
              </h2>
            </div>
          </div>
          <div className="text-right text-sm" style={{ color: themeConfig.secondaryColor }}>
            {personalInfo.email && (
              <div className="flex items-center justify-end gap-1 mb-1">
                <Mail className="w-4 h-4" />
                <span>{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center justify-end gap-1 mb-1">
                <Phone className="w-4 h-4" />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center justify-end gap-1">
                <MapPin className="w-4 h-4" />
                <span>{personalInfo.location}</span>
              </div>
            )}
          </div>
        </div>

        {personalInfo.summary && (
          <p className="text-sm leading-relaxed" style={{ color: '#444' }}>
            {personalInfo.summary}
          </p>
        )}

        <div className="flex gap-4 mt-2">
          {personalInfo.portfolio && (
            <a href={personalInfo.portfolio} className="text-sm flex items-center gap-1" style={{ color: themeConfig.primaryColor }}>
              <Globe className="w-4 h-4" />
              Portfolio
            </a>
          )}
          {personalInfo.linkedin && (
            <a href={personalInfo.linkedin} className="text-sm flex items-center gap-1" style={{ color: themeConfig.primaryColor }}>
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </a>
          )}
          {personalInfo.github && (
            <a href={personalInfo.github} className="text-sm flex items-center gap-1" style={{ color: themeConfig.primaryColor }}>
              <Github className="w-4 h-4" />
              GitHub
            </a>
          )}
        </div>
      </header>

      <div className="resume-body" style={{ display: themeConfig.layout === 'two-column' ? 'flex' : 'block', gap: '2rem' }}>
        {/* Main Content */}
        <main style={{ flex: themeConfig.layout === 'two-column' ? '2' : '1' }}>
          {/* Experience */}
          {experience.length > 0 && (
            <section className="mb-6">
              <h3 className="section-title">工作经历</h3>
              <div className="space-y-4">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold" style={{ color: themeConfig.primaryColor }}>
                          {exp.company}
                        </h4>
                        <span className="text-sm" style={{ color: themeConfig.secondaryColor }}>
                          {exp.position}
                        </span>
                      </div>
                      <span className="text-sm" style={{ color: themeConfig.secondaryColor }}>
                        {exp.startDate} - {exp.endDate || '至今'}
                      </span>
                    </div>
                    {exp.description && (
                      <p className="text-sm mt-1 leading-relaxed">{exp.description}</p>
                    )}
                    {exp.achievements && exp.achievements.length > 0 && (
                      <ul className="mt-2 space-y-1">
                        {exp.achievements.map((achievement, index) => (
                          <li key={index} className="text-sm flex items-start gap-2">
                            <span style={{ color: themeConfig.accentColor }}>•</span>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <section className="mb-6">
              <h3 className="section-title">项目经验</h3>
              <div className="space-y-4">
                {projects.map((project) => (
                  <div key={project.id}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold" style={{ color: themeConfig.primaryColor }}>
                          {project.name}
                        </h4>
                        <span className="text-sm" style={{ color: themeConfig.secondaryColor }}>
                          {project.role}
                        </span>
                      </div>
                      <span className="text-sm" style={{ color: themeConfig.secondaryColor }}>
                        {project.startDate} - {project.endDate}
                      </span>
                    </div>
                    {project.description && (
                      <p className="text-sm mt-1 leading-relaxed">{project.description}</p>
                    )}
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 text-xs rounded"
                            style={{
                              background: `${themeConfig.primaryColor}15`,
                              color: themeConfig.primaryColor,
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                    {project.achievements && project.achievements.length > 0 && (
                      <ul className="mt-2 space-y-1">
                        {project.achievements.map((achievement, index) => (
                          <li key={index} className="text-sm flex items-start gap-2">
                            <span style={{ color: themeConfig.accentColor }}>•</span>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education.length > 0 && (
            <section className="mb-6">
              <h3 className="section-title">教育背景</h3>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold" style={{ color: themeConfig.primaryColor }}>
                          {edu.school}
                        </h4>
                        <span className="text-sm" style={{ color: themeConfig.secondaryColor }}>
                          {degreeLabels[edu.degree]} · {edu.major}
                        </span>
                        {edu.gpa && (
                          <span className="text-sm ml-2" style={{ color: themeConfig.accentColor }}>
                            GPA: {edu.gpa}
                          </span>
                        )}
                      </div>
                      <span className="text-sm" style={{ color: themeConfig.secondaryColor }}>
                        {edu.startDate} - {edu.endDate}
                      </span>
                    </div>
                    {edu.description && (
                      <p className="text-sm mt-1">{edu.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>

        {/* Sidebar */}
        {themeConfig.layout === 'two-column' && (
          <aside style={{ flex: 1 }}>
            {/* Skills */}
            {skills.length > 0 && (
              <section className="mb-6">
                <h3 className="section-title">技能</h3>
                {Object.entries(groupedSkills).map(([category, skillList]) => (
                  <div key={category} className="mb-3">
                    <h4 className="text-sm font-medium" style={{ color: themeConfig.secondaryColor }}>
                      {category}
                    </h4>
                    <div className="space-y-1 mt-1">
                      {skillList.map((skill) => (
                        <div key={skill.id} className="flex justify-between text-sm">
                          <span>{skill.name}</span>
                          <span style={{ color: themeConfig.accentColor }}>
                            {levelLabels[skill.level]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </section>
            )}

            {/* Certifications */}
            {certifications.length > 0 && (
              <section className="mb-6">
                <h3 className="section-title">证书</h3>
                <div className="space-y-2">
                  {certifications.map((cert) => (
                    <div key={cert.id} className="text-sm">
                      <div className="font-medium" style={{ color: themeConfig.primaryColor }}>
                        {cert.name}
                      </div>
                      <div className="text-xs" style={{ color: themeConfig.secondaryColor }}>
                        {cert.issuer} · {cert.date}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Awards */}
            {awards.length > 0 && (
              <section className="mb-6">
                <h3 className="section-title">奖项</h3>
                <div className="space-y-2">
                  {awards.map((award) => (
                    <div key={award.id} className="text-sm">
                      <div className="font-medium" style={{ color: themeConfig.accentColor }}>
                        {award.name}
                      </div>
                      <div className="text-xs" style={{ color: themeConfig.secondaryColor }}>
                        {award.issuer} · {award.date}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Languages */}
            {languages.length > 0 && (
              <section>
                <h3 className="section-title">语言</h3>
                <div className="space-y-1 mt-2">
                  {languages.map((lang) => (
                    <div key={lang.id} className="flex justify-between text-sm">
                      <span>{lang.name}</span>
                      <span style={{ color: themeConfig.secondaryColor }}>
                        {proficiencyLabels[lang.proficiency]}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </aside>
        )}
      </div>

      {/* Single-column layout additional sections */}
      {themeConfig.layout !== 'two-column' && (
        <div className="grid grid-cols-2 gap-6 mt-6">
          {/* Skills */}
          {skills.length > 0 && (
            <section>
              <h3 className="section-title">技能</h3>
              {Object.entries(groupedSkills).map(([category, skillList]) => (
                <div key={category} className="mb-3">
                  <h4 className="text-sm font-medium" style={{ color: themeConfig.secondaryColor }}>
                    {category}
                  </h4>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {skillList.map((skill) => (
                      <span
                        key={skill.id}
                        className="px-2 py-0.5 text-xs rounded"
                        style={{
                          background: `${themeConfig.primaryColor}15`,
                          color: themeConfig.primaryColor,
                        }}
                      >
                        {skill.name} ({levelLabels[skill.level]})
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* Certifications & Awards */}
          <div>
            {certifications.length > 0 && (
              <section className="mb-4">
                <h3 className="section-title">证书</h3>
                <div className="space-y-1 mt-2">
                  {certifications.map((cert) => (
                    <div key={cert.id} className="text-sm">
                      <span className="font-medium" style={{ color: themeConfig.primaryColor }}>
                        {cert.name}
                      </span>
                      <span className="text-xs ml-2" style={{ color: themeConfig.secondaryColor }}>
                        {cert.issuer}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {awards.length > 0 && (
              <section className="mb-4">
                <h3 className="section-title">奖项</h3>
                <div className="space-y-1 mt-2">
                  {awards.map((award) => (
                    <div key={award.id} className="text-sm">
                      <span className="font-medium" style={{ color: themeConfig.accentColor }}>
                        {award.name}
                      </span>
                      <span className="text-xs ml-2" style={{ color: themeConfig.secondaryColor }}>
                        {award.issuer}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {languages.length > 0 && (
              <section>
                <h3 className="section-title">语言</h3>
                <div className="space-y-1 mt-2">
                  {languages.map((lang) => (
                    <div key={lang.id} className="text-sm">
                      <span>{lang.name}</span>
                      <span className="text-xs ml-2" style={{ color: themeConfig.secondaryColor }}>
                        {proficiencyLabels[lang.proficiency]}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      )}

      <style>{`
        .section-title {
          font-size: 14px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: ${themeConfig.primaryColor};
          border-bottom: 2px solid ${themeConfig.primaryColor};
          padding-bottom: 4px;
          margin-bottom: 12px;
        }
        .resume-header {
          padding-bottom: 16px;
          border-bottom: 2px solid ${themeConfig.primaryColor};
          margin-bottom: 20px;
        }
      `}</style>
    </div>
  );
}